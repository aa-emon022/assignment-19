import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
// -------------------------------------------
//             Insert a data
// -------------------------------------------
export async function POST(req, res) {
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  try {
    const prisma = new PrismaClient();

    let cart = await prisma.cart.create({
      data: {
           title: "UpdatedCartTitle",
            sessionId: "UpdatedSessionID",
            token: "UpdatedToken",
            status: "UpdatedStatus",
            firstName: "UpdatedFirstName",
            middleName: "UpdatedMiddleName",
            lastName: "UpdatedLastName",
            mobile: "UpdatedMobileNumber",
            email: "updated.email@example.com",
            city: "UpdatedCity",
            country: "UpdatedCountry",
            createAt: new Date(), 
            updateAt: new Date(),
            user:{connect:{id:1}} ,
        
        
      },
    });
    return NextResponse.json({ status: "success", data: cart });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}

//-------------------------------------------
//            update all a data
// -------------------------------------------
export async function PUT() {
  BigInt.prototype.toJSON = function () {
    return this.toString;
  };

  try {
    const prisma = new PrismaClient();

    

    
    const cartUpdate = prisma.cart.update({
      where: { id: 6 },
      data: {
          title: "UpdatedCartTitle",
            sessionId: "UpdatedSessionID",
            token: "UpdatedToken",
            status: "UpdatedStatus",
            firstName: "UpdatedFirstName",
            middleName: "UpdatedMiddleName",
            lastName: "UpdatedLastName",
            mobile: "UpdatedMobileNumber",
            email: "updated.email@example.com",
            city: "UpdatedCity",
            country: "UpdatedCountry",
            createAt: new Date(), 
            updateAt: new Date(),
      },
    });

    

    return NextResponse.json({ status: "pass", data: cartUpdate});
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}
// -------------------------------------------
//             Read all a data
// -------------------------------------------

export async function GET() {
  BigInt.prototype.toJSON = function () {
    return this.toString;
  };

  try {
    const prisma = new PrismaClient();
    const userGets = await prisma.cart.aggregate({
      _count: {
        id: true,
      },
    });

   

    return NextResponse.json({ status: "pass", data: userGets });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}

// -------------------------------------------
//             Delete all a data  & Transactions & Rollback
// -------------------------------------------
export async function DELETE() {
  BigInt.prototype.toJSON = function () {
    return this.toString;
  };

  try {
    const prisma = new PrismaClient();
    const show = prisma.cart.findFirst({
        where:{id:1}
    })
    const userDelete = prisma.cart.delete({
      where: { id: 1 },
    });
const result = await prisma.$transaction([show,userDelete])
    return NextResponse.json({ status: "pass", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}
