## React App Template

This is a React template for Kubefirst projects to maintain frontend standards across the board.

## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `yarn` installed globally on your machine.  

Installation:

`yarn install`  

To Run Linter:  

`yarn lint`  

To Start Server:

`yarn start`  

To Visit App:

`localhost:1234`  


## Publish Docker image to ECR

### Build the Docker image

`docker build --tag public.ecr.aws/kubefirst/console:{version} .`

### Push Docker Image to ECR

1. Retrieve an authentication token and authenticate your Docker client to your registry.
  `aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/kubefirst`
2. Run the following command to push this image to your newly created AWS repository:
  `docker push public.ecr.aws/kubefirst/console:{version}`
