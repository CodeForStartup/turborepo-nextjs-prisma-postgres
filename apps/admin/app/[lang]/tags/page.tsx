
// import { DEFAULT_TAG_PAGE_LIMIT } from "@/constants"
// import APP_APIS from "@/constants/apis"
import PageTitle from "@/molecules/page-title"

import TaskList from "app/[lang]/tags/components/taskList"
// import { GetDataSuccessType } from "@/types"
// import { TTagItem } from "@/types/tags"

export const metadata = {
  title: "Tags",
  description:
    "A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.",
}

export default async function Page({ searchParams }) {

  // const tagsRaw = await fetch(
  //   `${process.env.NEXT_PUBLIC_FRONTEND_URL}${APP_APIS.public.tags.GET}?${querystring.stringify({
  //     query: searchParams?.query,
  //     limit: searchParams?.limit,
  //     page: searchParams?.page,
  //   })}`,
  //   {
  //     method: "GET",
  //     cache: "no-cache",
  //   }
  // )

  // const tags: GetDataSuccessType<TTagItem[]> = await tagsRaw.json()

  const tags = {
    data: [
      {
        id: 1,
        name: 'tag data',
        description: 'data explain',
        image: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/61.jpg',
        last_update: '1/1/12024',
        total_post: '12',
        status: 'active',
      },
      {
        id: 2,
        name: 'tag data 3',
        description: 'data explain',
        image: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/61.jpg',
        last_update: '1/1/12024',
        total_post: '12',
        status: 'inactive',
        _count: {
          select: {
            tagOnPost: true,
          },
        },
      },
      {
        id: 3,
        name: 'tag data 3',
        description: 'data explain',
        image: 'https://refine-crm.ams3.cdn.digitaloceanspaces.com/avatars/61.jpg',
        last_update: '1/1/12024',
        total_post: '12',
        status: 'active',
      }
    ],
  }

  return (
    <div className="w-full p-8">
      <PageTitle
        title="Tags"
      />
      <TaskList tags={tags} />
    </div>
  )
}
