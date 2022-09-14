export interface Users {
  id?: number;
   username?: string;
   password?: string;
   fName: string;
   mName?: string;
   lName: string;
   type: 'student' | 'landlord';
   email: string;
   birthdate: string;
   degree: string;
   department: string;
   college: string;
   contact: string;
   gender:string;
   year: string;
   address1: string;
   address2: string;
   address3: string;
   address4: string;
   housingunit: string;
   status: 'active' | 'inactive'
}

export interface AccountStateInterface {
  allAccount: Users[];
  newUser?: Users;
}

function state(): AccountStateInterface {
  return {
    allAccount: [
      // {
      //   id: 111,
      //   username: "luffy12",
      //   password: "password",
      //   fName: "luffy",
      //   mName: "D",
      //   lName: "Monkey",
      //   type: "student",
      //   email: "123@gmail.com",
      //   birthdate: "October 19, 1998",
      //   degree: "BS-IT",
      //   department: "Computer Department",
      //   college: "College of Technology",
      //   contact: "09126337532",
      //   gender:"male",
      //   yearAdmit: "2018",
      //   address1: "Bangon",
      //   address2: "Sacayo Street",
      //   address3: "Marawi City",
      //   address4: "Lanao Del Sur",
      //   housingunit: "PIRATEs",
      //   status : "active",
      // }
    ],
  };
}

export default state;
