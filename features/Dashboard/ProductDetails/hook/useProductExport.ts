import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { IProductSchema } from "../schema";

const useProductExport = () => {
  const handleExportToPDF = (products: IProductSchema[], slug: string) => {
    const doc = new jsPDF();
    const title = `Products ${slug}`;
    doc.text(title, 14, 10);

    const tableData = products.map((item, index) => [
      index + 1,
      item.name,
      `Rp ${item.price.toLocaleString()}`,
      item?.variants[0]?.size,
      item?.variants[0]?.stock,
      new Date(item.createdAt).toLocaleString(),
    ]);

    autoTable(doc, {
      head: [["No", "Product", "Price", "Size", "Qty", "Date"]],
      body: tableData,
      startY: 20,
    });

    const fileName = `products-${slug.toLowerCase()}.pdf`;
    doc.save(fileName);
  };

  return { handleExportToPDF };
};

export default useProductExport;
