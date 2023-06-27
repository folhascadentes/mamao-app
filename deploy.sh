#!/bin/bash

source .env

npm run build

REGION=$AWS_REGION
S3_BUCKET_NAME=$S3_BUCKET_NAME
CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_DISTRIBUTION_ID

aws s3 sync build/ s3://$S3_BUCKET_NAME --delete
aws cloudfront update-distribution --id $CLOUDFRONT_DISTRIBUTION
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "Deploy concluído com sucesso!"
