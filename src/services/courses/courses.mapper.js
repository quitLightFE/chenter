import { getPbImage } from "@/utils/getPbImage";

export const mapCourse = course => {
  //console.error("course", pb.files.getURL(course, course.image));
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    created: course.created,
    difficulty: course.difficulty,
    image: getPbImage(course, course.image),
    teacher: course?.expand?.teacher ?? null
  };
};
