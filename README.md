# Serverless-File-Converter
Serverless File Converter, Deployed using Cloud Run and Cloud Build. Event Triggered From Bucket



Serverless File Converter
===========================
This Serverless File Converter is Runing on Cloud run and deployed automatically using cloud build.
When a file is uploaded to a specified bucket the app converts the file format and upload the file to the converted files folder.

What does we have here?

Firsi is the Dockerfile that is responsible for the Docker Image for the App.
Index.js is the Converter App.

in the Bash Script file we have a script that will:
* Specify Env Variable of the working folder as GOOGLE_CLOUD_PROJECT
* Builds an Container from our app over google cloud platform using Cloud Build
* Deploy The App using Cloud Run
* Specify Env Variable of the output service URL as SERVICE_URL
* Test Un-Authenticated Post Request to the Service URL ==> Result Should be permission Denied
* Test Authenticated Post Request to the Service URL ==> Result Should be OK
* Creates 2 buckets 1 for uploads 1 for converted files
* Create Pubsub Topic, and add Trigger from the upload files Bucket for every uploaded file
* Create new Service Account for Pubsub to Trigger Cloud Run service
* Give the new service account permission to invoke file Converter App
* Enable the project to create Pub Sub authenticatio tokens
* Create The PubSub  Subscription so that the file converter can run whenver a message is published
* Re Build The Container
* Re Deploy The Container
* 
