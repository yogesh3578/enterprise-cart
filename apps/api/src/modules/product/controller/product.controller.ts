import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { sendResponse } from "../../../shared/utils/apiResponse";

import productService from "../service/product.service";
import { ProductQueryDto } from "../dto/product-query.dto";

class ProductController {
    create = asyncHandler(async (req: Request, res: Response) => {
        const product = await productService.create(req.body);

        sendResponse(res, StatusCodes.CREATED, {
            success: true,
            message: "Product created successfully",
            data: product,
        });
    });

    getAll = asyncHandler(async (req: Request, res: Response) => {
        const result = await productService.getAll(req.query as ProductQueryDto);

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Products fetched successfully",
            data: result.data,
            meta: result.meta,
        });
    });

    getById = asyncHandler(async (req, res) => {
        const product = await productService.getById(
            String(req.params.id)
        );

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    });

    update = asyncHandler(async (req, res) => {
        const product = await productService.update(
            String(req.params.id),
            req.body
        );

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    });

    delete = asyncHandler(async (req: Request, res: Response) => {
  await productService.delete(String(req.params.id));

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "Product deleted successfully",
  });
});

restore = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.restore(String(req.params.id));

  sendResponse(res, StatusCodes.OK, {
    success: true,
    message: "Product restored successfully",
    data: product,
  });
});


}

export default new ProductController();