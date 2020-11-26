This is React backend code for a Avybe's code challenge:

Things to improve
The rest api uses Token based Authentication to allow both web and mobile app to access private resource. However, It uses basic token authentication provided by Django-rest-framework which does not expired thus is only suitable for prototyping. If I have more time to get familiar with Python and Django, I would change the implementation to JWT token or integrate with Auth0 service to handle authentication to the backend can focus on busisness logic

Another part to improve is storaging uploaded images. Currently, there is not restricted size to the images. It's a waste of resource when users upload big images as avatar. Secondly, old images don't get removed when new one is saved for a specific user. I'd like to address these points in the if I have more time for this project. It would also be fun to learn how to store images in AWS.
