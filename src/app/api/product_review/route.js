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

    let productCreate = await prisma.product_review.create({
      data: {
            title: "new title",
            rating: "new  rating",
            content: "new Content",
            createAt: new Date(),
            updateAt: new Date(),
            product: { connect: { id: 1 } },

      },
    });
    return NextResponse.json({ status: "success", data: productCreate });
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
    const userGets = await prisma.product_review.groupBy({
      by: ["title"],
      _count: { id: true },
    });

    return NextResponse.json({ status: "pass", data: userGets });
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

    

   
    const product_reviewUpdate = prisma.product_review.update({
      where: { id:1 },
      data: {
        title: "new title",
        rating: "new  rating",
        content: "new Content",
        createAt: new Date(),
        updateAt: new Date(),
      },
    });

    

    return NextResponse.json({ status: "pass", data: product_reviewUpdate });
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
      const show = prisma.product_review.findFirst({
          where:{id:1}
      })
      const userDelete = prisma.product_review.delete({
        where: { id: 1 },
      });
  const result = await prisma.$transaction([show,userDelete])
      return NextResponse.json({ status: "pass", data: result });
    } catch (e) {
      return NextResponse.json({ status: "fail", data: e.message });
    }
  }
