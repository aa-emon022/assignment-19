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

    let users = await prisma.user.create({
      data: {
        firstName: "John3",
        middleName: "Doe",
        lastName: "Smith",
        mobile: "1234567890",
        email: "john@example.com",
        password: "hashed_password",
        admin: 1,
        registeredAt: new Date(),
        lastLogin: new Date(),
        createAt: new Date(),
        updateAt: new Date(),

        product: {
          create: {
            firstName: "UpdatedProductName",
            metaTitle: "UpdatedMetaTitle",
            slug: "updated-slug",
            summary: "UpdatedProductSummary",
            price: 25,
            discount: 5,
            publishedAt: new Date(), 
            startAt: new Date(), 
            endsAt: new Date(), 
            createAt: new Date(),
            updateAt: new Date(), 
          },
        },
        cart: {
          create: {
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
        },
        order: {
          create: {
            title: "UpdatedOrderTitle",
            token: "UpdatedToken",
            sub_total: 50, 
            itemDiscount: 5, 
            tax: 8,
            total: 53, 
            discount: 3, 
            grandTotal: 50, 
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
        },
      },
    });
    return NextResponse.json({ status: "success", data: users });
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

    const userUpdate = prisma.user.update({
      where: { id: 2 },
      data: {
        firstName: "John3",
        middleName: "Doe",
        lastName: "Smith",
        mobile: "1234567890",
        email: "john@example.com",
        password: "hashed_password",
        admin: 1,
        registeredAt: new Date(),
        lastLogin: new Date(),
        createAt: new Date(),
        updateAt: new Date(),
      },
    });

    const orderUpdate = prisma.order.update({
      where: { id: 2 },
      data: {
        title: "UpdatedOrderTitle",
        token: "UpdatedToken",
        sub_total: 50, 
        itemDiscount: 5, 
        tax: 8, 
        total: 53, 
        discount: 3, 
        grandTotal: 50, 
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
    const cartUpdate = prisma.cart.update({
      where: { id: 2 },
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

    const result = await prisma.$transaction([
      userUpdate,
      orderUpdate,
      cartUpdate,
    ]);

    return NextResponse.json({ status: "pass", data: result });
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
    const userGets = await prisma.user.aggregate({
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
//             Delete all a data & Transactions & Rollback
// -------------------------------------------
export async function DELETE() {
  BigInt.prototype.toJSON = function () {
    return this.toString;
  };

  try {
    const prisma = new PrismaClient();

    const userDelete = prisma.user.delete({
      where: { id: 1 },
    });

    return NextResponse.json({ status: "pass", data: userDelete });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e.message });
  }
}
