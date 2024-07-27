import { Env } from '@env';
import { createQuery } from 'react-query-kit';

import type { Post } from '../../types/post.type';

type Response = Post[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const usePosts = createQuery<Response, Variables>({
  queryKey: ['posts'],
  fetcher: () => {
    return fetch(Env.API_URL + `posts`).then((response) => response.json());
  },
});
