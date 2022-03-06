import { Router, Request, Response } from "express";

import PdfPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from 'fs';

import { prismaClient } from "./database/prismaClient";

const routes = Router();

routes.get("/products", async (request: Request, response: Response) => {
    const products = await prismaClient.products.findMany();
    return response.json(products)
});

routes.get("/products/report", (request: Request, response: Response) => {
    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        },
    };
    const printer = new PdfPrinter(fonts);

    const docDefinitions: TDocumentDefinitions = {
        defaultStyle: { font: "Helvetica" },
        content: [{ text: "Geração de relatorio de produtos cadastrados" }],
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"));
});

export { routes };