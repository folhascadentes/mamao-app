import boto3
import json
import os
import gzip
import base64
import io


dynamodb = boto3.resource('dynamodb', region_name='sa-east-1')
table = dynamodb.Table('sign-database')


def write_items(token, items):
    directory_path = os.path.join('dataset', token)
    os.makedirs(directory_path, exist_ok=True)
    for item in items:
        file_name = f"{item['timestamp']}_{item['userId']}.json"
        with open(os.path.join(directory_path, file_name), 'w') as f:
            landmarks = item['landmarks']

            # Try to decompress the landmarks
            if landmarks[0] != '[':
                try:
                    compressed_data = base64.b64decode(landmarks)
                    landmarks = gzip.GzipFile(fileobj=io.BytesIO(
                        compressed_data)).read().decode('utf-8')
                except Exception as e:
                    print('error', e)
                    pass

            # Parse landmarks JSON string into a Python object
            landmarks = json.loads(landmarks)

            json.dump(landmarks, f, indent=2)


def scan_table_and_write_files():
    response = table.scan()

    data = response['Items']
    groups = {}
    for item in data:
        token = item['token']
        if token not in groups:
            groups[token] = []
        groups[token].append(item)

    # Write files immediately after gathering items for each token
    for token, items in groups.items():
        write_items(token, items)

    while 'LastEvaluatedKey' in response:
        response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data = response['Items']
        groups = {}  # Reset the groups for each new set of items

        for item in data:
            token = item['token']
            if token not in groups:
                groups[token] = []
            groups[token].append(item)

        # Write files immediately after gathering items for each token
        for token, items in groups.items():
            write_items(token, items)


# Run the function to start the process
scan_table_and_write_files()
