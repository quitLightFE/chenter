import pb from "@/lib/pocketbase";

const getPbImage = (record, fileName) => {
  if (!record || !fileName) {
    return "/images/avatar-placeholder.png";
  }

  return pb.files.getURL(record, fileName);
};

const getPbImageThumb = (record, fileName) => {
  if (!record || !fileName) {
    return "/images/avatar-placeholder.png";
  }

  return pb.files.getURL(record, fileName, { thumb: "100x100" });
};

export { getPbImage, getPbImageThumb };
