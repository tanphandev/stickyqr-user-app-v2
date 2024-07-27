import { createMutation } from 'react-query-kit';

import type { Post } from '../../types/post.type';

type Variables = { title: string; body: string; userId: number };
type Response = Post;

export const useAddPost = createMutation<Response, Variables>({
  mutationFn: async (variables) =>
    fetch('posts/add', {
      method: 'POST',
      body: JSON.stringify(variables),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()),
});
