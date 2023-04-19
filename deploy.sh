#!/bin/bash

# define as variáveis com as informações da sua aplicação
S3_BUCKET_NAME="mamao-app-tashiro"
CLOUDFRONT_DISTRIBUTION_ID="E1VR611MGCR6I3"

# faz o build da aplicação
npm run build

# sincroniza os arquivos do build com o S3
aws s3 sync build/ s3://$S3_BUCKET_NAME --delete

# invalida o cache do CloudFront
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "Deploy concluído com sucesso!"