import { UserDocument } from "@/models/User"; // Import UserDocument

declare module "next-auth" {
  // Extend the Session interface to include custom fields
  interface Session {
    user: {
      id: string;
      admin: boolean;
      initialLogin: boolean;
      email: string;
      name: string;
    };
  }

  // Extend the User interface from NextAuth to include fields from your MongoDB User model
  interface User extends UserDocument {} // Now the User interface includes all fields from UserDocument
}
