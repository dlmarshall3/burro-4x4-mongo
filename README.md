# Burro 4x4 Dashboard

### Description:
About a year ago (summer of 2023), I visited my brother-in-law's family in Virginia, and we talked about his new business, [Burro 4x4](https://www.burro4x4.com), where he "specializ[es] in restoration, parts, repair and customization of Series Land Rover[s]." One of the issues he has run into is clients wanting to know the status of their work without an easy way to check. We toyed around with the idea for a while, but eventually, Ben (owner) reached out and went, "How quickly could you put this together?" I then went into MVP mode and, after about a week, have a working portal for his clients.

### Features:
On the admin side, Ben is able to add vehicles and clients, along with adding text and image updates for the client to view at their leisure. Clients then can login and have read-only access to their vehicle dashboard.

### How to use (as a client):
1. Log into the dashboard at https://burro-dashboard.vercel.app
2. **Username**: test@burro4x4.com / **Password**: Welcome123!
3. At this point, you'll see the dashboard with the following vehicle:
![Screenshot 2024-11-27 at 6 03 07 PM](https://github.com/user-attachments/assets/2d8a75a7-76fb-4123-867c-2feeacff1321)
4. If you click on the "View" button, you'll then see the updates and can download the attached images.

### How to use (as an admin):
Video coming soon

### Technology used:
At first, I started with Angular for the frontend, but decided to switch to Next.js due a) needing an API and b) how easy it is to deploy to Vercel. The authentication is handled by way of Next Auth and MongoDB, along with document and data storage. However, due to budget constraints and MongoDB's file storage limitations, all images are currently hosted in Supabase. Once we move past the MVP stage, this will be handled entirely with MongoDB.

### NOTES:
With how quickly I put this together, along with not trying to add more features than immediately necessary, there are a handful of things I plan on adding/changing in the near future. They are, but not limited to:

- Refactoring syntax across the codebase to be consistent (function vs const, how data is sent to the API, etc.)
- Consolidating the session checks into a middleware
- 100% code coverage with unit tests
- Adding real-time error logging
- Including the ability to archive clients and vehicles
- Allowing updates to be edited or deleted
- Utilizing a magic link for the authentication

Again, with the focus on getting a working product to my brother-in-law, there are a handful of things I want to clean up with the codebase, but I'm still proud of being able to throw this together so quickly. Let me know if you have any questions! [davidmarshalldev.kc@gmail.com](mailto:davidmarshalldev.kc@gmail.com)
