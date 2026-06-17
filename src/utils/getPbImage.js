import pb from "@/lib/pocketbase";

const getPbImage = (record, fileName, option = {}) => {
  if (!record || !fileName) {
    // console.error(record, "\n", fileName);
    return "/images/avatar-placeholder.png";
  }
  //console.error(record, "\n", fileName);

  return pb.files.getURL(record, fileName, option);
};
export { getPbImage };
