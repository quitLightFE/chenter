import pb from "@/lib/pocketbase";

import { mapCourse } from "@/services/courses/courses.mapper";

export const getCourses = async () => {
  const courses = await pb.collection("courses").getFullList({
    sort: "-created",
    filter: "isPublished = true"
  });
  //return [...courses.map(c => ({ ...c, image: pb.files.getURL(c, c.image) }))];
  return courses.map(mapCourse)
};

export const getCourseById = async id => {
  const course = await pb.collection("courses").getOne(id);

  return mapCourse(courses);
};
