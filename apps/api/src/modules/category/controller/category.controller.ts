import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import categoryService from "../service/category.service";

import { asyncHandler } from "../../../shared/utils/asyncHandler";
import { sendResponse } from "../../../shared/utils/apiResponse";
import { pick } from "@/shared/utils/pick";
import { CATEGORY_FILTERABLE_FIELDS } from "../constants/category.constants";
import { paginationFields } from "@/shared/constants/query";


class CategoryController {
    create = asyncHandler(async (req: Request, res: Response) => {
        const category = await categoryService.create(req.body);

        sendResponse(res, StatusCodes.CREATED, {
            success: true,
            message: "Category created successfully",
            data: category,
        });
    });

    getAll = asyncHandler(async (req, res) => {
        const filters = pick(req.query, CATEGORY_FILTERABLE_FIELDS);

        const pagination = pick(req.query, paginationFields);

        const result = await categoryService.getAll(
            filters,
            pagination
        );

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Categories fetched successfully",
            data: result.data,
            meta: result.meta,
        });
    });

    getById = asyncHandler(async (req: Request, res: Response) => {
        const category = await categoryService.getById(String(req.params.id));

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    });

    update = asyncHandler(async (req: Request, res: Response) => {
        const category = await categoryService.update(
            String(req.params.id),
            req.body
        );

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    });

    delete = asyncHandler(async (req: Request, res: Response) => {
        await categoryService.delete(String(req.params.id));

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Category deleted successfully",
        });
    });

    getBySlug = asyncHandler(async (req: Request, res: Response) => {
        const category = await categoryService.getBySlug(
            String(req.params.slug)
        );

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Category fetched successfully",
            data: category,
        });
    });

    restore = asyncHandler(async (req: Request, res: Response) => {
        const category = await categoryService.restore(
            String(req.params.id)
        );

        sendResponse(res, StatusCodes.OK, {
            success: true,
            message: "Category restored successfully",
            data: category,
        });
    });
}

export default new CategoryController();