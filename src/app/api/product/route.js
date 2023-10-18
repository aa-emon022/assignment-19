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

    let productCreate = await prisma.product.create({
      data: {
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
        user: { connect: { id: 1 } },

        product_meta: {
          create: {
            key: "new key",
            content: "new Content",
            createAt: new Date(),
            updateAt: new Date(),
          },
        },

        product_review: {
          create: {
            title: "new title",
            rating: "new  rating",
            content: "new Content",
            createAt: new Date(),
            updateAt: new Date(),
          },
        },
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
    const userGets = await prisma.product.groupBy({
      by: ["firstName"],
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

    const productUpdate = prisma.product.update({
      where: { id: 2 },
      data: {
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
        //user: { connect: { id: 1 } },
        product_meta: {
          create: {
            key: "new key",
            content: "new Content",
            createAt: new Date(),
            updateAt: new Date(),
          },
        },
      },
    });

    const orderUpdate = prisma.product_meta.update({
      where: { id: 2 },
      data: {
        key: "new key",
        content: "new Content",
        createAt: new Date(),
        updateAt: new Date(),
      },
    });
    const cartUpdate = prisma.product_review.update({
      where: { id: 2 },
      data: {
        title: "new title",
        rating: "new  rating",
        content: "new Content",
        createAt: new Date(),
        updateAt: new Date(),
      },
    });

    const result = await prisma.$transaction([
      productUpdate,
      orderUpdate,
      cartUpdate,
    ]);

    return NextResponse.json({ status: "pass", data: result });
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
