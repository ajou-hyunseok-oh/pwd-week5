// 이번 실습은 백엔드 없이 동작합니다. 초기 데이터는 README의 가상 맛집입니다.
const initialRestaurants = [
  {
    id: 1,
    name: "송림식당",
    category: "한식",
    location: "경기 수원시 영통구 월드컵로193번길 21 원천동",
    priceRange: "7,000-13,000원",
    rating: 4.99,
    description: "맛있는 한식 맛집입니다.",
    recommendedMenu: ["순두부", "김치찌개","소불고기", "제육볶음"],
    likes: 0,
    image: "https://mblogthumb-phinf.pstatic.net/MjAyMjA2MTJfODEg/MDAxNjU0OTYzNTM3MjE1.1BfmrmOsz_B6DBHAnhQSs6qfNIDnssofR-DrzMfigIIg.JHHDheG6ifJjtfKUqLss_mLXWFE9fNJ5BmepNUVXSOog.PNG.cary63/image.png?type=w966"
  },
  {
    id: 2,
    name: "별미떡볶이",
    category: "분식",
    location: "경기 수원시 영통구 아주로 42 아카데미빌딩",
    priceRange: "7,000-10,000원",
    rating: 4.98,
    description: "바삭한 튀김과 함께하는 행복한 한입",
    recommendedMenu: ["떡볶이", "튀김", "순대", "어묵"],
    likes: 0,
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA4MTJfMjcg%2FMDAxNzU0OTQ5ODk1Mjg0.GR6i3mNpJJXyqQrozGEJ65InCDBGlEmxc0aCeVHncJgg.sduDPX67J8hhoGxq4vLohpS4dXk1w-706dQLPfVs1iwg.JPEG%2Foutput%25A3%25DF1564208956.jpg"
  },
  {
    id: 3,
    name: "Sogo",
    category: "일식",
    location: "경기 수원시 영통구 월드컵로193번길 7",
    priceRange: "10,000-16,000원",
    rating: 4.89,
    description: "일식 맛집, 구 허수아비,",
    recommendedMenu: ["냉모밀", "김치돈까스나베", "코돈부르"],
    likes: 0,
    image: "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190707_63%2F1562462598960nPDMy_JPEG%2FW7iKQEhTMzCF3flC1t0pzgzF.jpeg.jpg"
  }
];

const RESTAURANTS_KEY = 'pwd-week5-restaurants';
const SUBMISSIONS_KEY = 'pwd-week5-submissions';

function readItems(key, fallback = []) {
  const saved = localStorage.getItem(key);
  if (saved === null) return structuredClone(fallback);
  const items = JSON.parse(saved);
  if (!Array.isArray(items)) throw new Error('저장된 실습 데이터 형식을 확인해주세요.');
  return items;
}

function writeItems(key, items) {
  // 저장 실패는 호출자에게 전달하여 성공 메시지가 표시되지 않도록 합니다.
  localStorage.setItem(key, JSON.stringify(items));
}

function updateItem(key, id, payload, fallback = []) {
  const items = readItems(key, fallback);
  const index = items.findIndex((item) => String(item.id) === String(id));
  if (index === -1) throw new Error('항목을 찾을 수 없습니다.');
  items[index] = { ...items[index], ...payload, id: items[index].id };
  writeItems(key, items);
  return { data: items[index] };
}

function deleteItem(key, id, fallback = []) {
  const items = readItems(key, fallback);
  writeItems(key, items.filter((item) => String(item.id) !== String(id)));
  return 204;
}

// 기존 페이지가 사용하는 비동기 인터페이스와 { data: ... } 응답을 유지합니다.
export const restaurantAPI = {
  getRestaurants: async () => ({ data: readItems(RESTAURANTS_KEY, initialRestaurants) }),

  getRestaurantById: async (id) => ({
    data: readItems(RESTAURANTS_KEY, initialRestaurants)
      .find((item) => String(item.id) === String(id)),
  }),

  getPopularRestaurants: async () => ({
    data: readItems(RESTAURANTS_KEY, initialRestaurants)
      .sort((a, b) => b.rating - a.rating).slice(0, 5),
  }),

  createRestaurant: async (payload) => {
    const items = readItems(RESTAURANTS_KEY, initialRestaurants);
    const item = {
      ...payload,
      id: crypto.randomUUID(),
      rating: payload.rating ?? 0,
      recommendedMenu: payload.recommendedMenu ?? [],
      likes: 0,
    };
    writeItems(RESTAURANTS_KEY, [...items, item]);
    return { data: item };
  },

  updateRestaurant: async (id, payload) =>
    updateItem(RESTAURANTS_KEY, id, payload, initialRestaurants),

  deleteRestaurant: async (id) =>
    deleteItem(RESTAURANTS_KEY, id, initialRestaurants),
};

export const submissionAPI = {
  createSubmission: async (payload) => {
    const items = readItems(SUBMISSIONS_KEY);
    const item = { ...payload, id: crypto.randomUUID(), status: 'pending' };
    writeItems(SUBMISSIONS_KEY, [...items, item]);
    return { data: item };
  },

  listSubmissions: async (status) => ({
    data: readItems(SUBMISSIONS_KEY).filter((item) => !status || item.status === status),
  }),

  updateSubmission: async (id, payload) => updateItem(SUBMISSIONS_KEY, id, payload),

  deleteSubmission: async (id) => deleteItem(SUBMISSIONS_KEY, id),
};

export default restaurantAPI;
