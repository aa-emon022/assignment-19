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

    let productCreate = await prisma.category.create({
      data: {
            title: "new title",
            metaTitle: "Meta Titl",
            slug:"NEW SLAG",
            content: "new Content",
            createAt: new Date(),
            updateAt: new Date(),
           

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

    

   
    const categoryUpdate = prisma.category.update({
      where: { id:2 },
      data: {
        title: "2new title",
        metaTitle: "Meta Title",
        slug:"NEW SLAG",
        content: "new Content",
        createAt: new Date(),
        updateAt: new Date(),
      },
    });

    

    return NextResponse.json({ status: "pass", data:categoryUpdate });
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
      const show = prisma.category.findFirst({
          where:{id:1}
      })
      const userDelete = prisma.category.delete({
        where: { id: 1 },
      });
  const result = await prisma.$transaction([show,userDelete])
      return NextResponse.json({ status: "pass", data: result });
    } catch (e) {
      return NextResponse.json({ status: "fail", data: e.message });
    }
  }
