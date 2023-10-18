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

    let productCreate = await prisma.product_meta.create({
      data: {
        key: "new key",
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
//             Read all a data & Transactions & Rollback
// -------------------------------------------

export async function GET() {
  BigInt.prototype.toJSON = function () {
    return this.toString;
  };

  try {
    const prisma = new PrismaClient();
    const userGets = await prisma.product.groupBy({
      by: ["key"],
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

   
    const orderUpdate = await prisma.product_meta.update({
      where: { id: 3 },
      data: {
        key: "new key",
        content: "new Content",
        createAt: new Date(),
        updateAt: new Date(),
      },
    });
    

    return NextResponse.json({ status: "pass", data: orderUpdate });
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
      const show = prisma.product_meta.findFirst({
          where:{id:1}
      })
      const userDelete = prisma.product_meta.delete({
        where: { id: 1 },
      });
  const result = await prisma.$transaction([show,userDelete])
      return NextResponse.json({ status: "pass", data: result });
    } catch (e) {
      return NextResponse.json({ status: "fail", data: e.message });
    }
  }
