// src/features/usePosts.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  deletePost,
  addPostLocally,
  updatePostLocally,
} from "./postSlice";

export const usePosts = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector((state: any) => state.posts);

  // Component load হলে posts fetch করা
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPost());
    }
  }, [dispatch, posts.length]);

  // Posts handle করার functions
  const deletePostById = (id: string) => dispatch(deletePost(id));
  const addPost = (post: any) => dispatch(addPostLocally(post));
  const updatePost = (post: any) => dispatch(updatePostLocally(post));

  return {
    posts,
    isLoading,
    error,
    deletePostById,
    addPost,
    updatePost,
  };
};
