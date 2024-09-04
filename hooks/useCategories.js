import { useEffect, useState } from "react";
import { newRequest } from "../api/newRequest";
import useRecentlyPlayed from "./useRecentlyPlayed";

let cachedCategories = null;
let cachedUserData = null;
let isDataFetched = false;

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [landingCategories, setLandingCategories] = useState([]);
  const [exploreCategories, setExploreCategories] = useState([]);
  const [userData, setUserData] = useState({});
  const { fetchRecentlyPlayed } = useRecentlyPlayed();

  useEffect(() => {
    const fetchData = async () => {
      let categoriesData = cachedCategories || [];
      let userData = cachedUserData || {};

      if (!isDataFetched) {
        const res = await newRequest("/homepage/home");
        categoriesData = res.data.categories;
        userData = res.data.user;

        cachedCategories = categoriesData;
        cachedUserData = userData;
        isDataFetched = true;
      }

      const previous = await fetchRecentlyPlayed();
      let updatedCategories = [...categoriesData];

      if (previous.length > 0) {
        const recentlyPlayedCategory = {
          parentCategory: "Recently Played",
          subCategories: previous.map((category) => {
            const matchingCategory = categoriesData.find((c) =>
              c.subCategories.some((sc) => sc.name === category)
            );
            const logoUrl = matchingCategory
              ? matchingCategory.subCategories.find(
                  (sc) => sc.name === category
                ).logo
              : "";
            return { name: category, logo: logoUrl };
          }),
        };

        // Ensure Recently Played is always part of the landing page categories
        const index = updatedCategories.findIndex(
          (c) => c.parentCategory === "Recently Played"
        );
        if (index !== -1) {
          updatedCategories[index] = recentlyPlayedCategory;
        } else {
          updatedCategories.unshift(recentlyPlayedCategory);
        }
      }

      setCategories(updatedCategories);

      // Include Recently Played in landing page categories
      const landingPageCategories = updatedCategories.filter((cat) =>
        ["Recently Added", "Popular", "Trending", "Recently Played"].includes(
          cat.parentCategory
        )
      );
      setLandingCategories(landingPageCategories);

      // Categories for Explore Categories page (excluding landing page categories)
      const explorePageCategories = updatedCategories.filter(
        (cat) =>
          ![
            "Recently Added",
            "Popular",
            "Trending",
            "Recently Played",
          ].includes(cat.parentCategory)
      );
      setExploreCategories(explorePageCategories);

      setUserData(userData);
    };

    fetchData();
  }, []);

  return { landingCategories, exploreCategories, userData };
}
