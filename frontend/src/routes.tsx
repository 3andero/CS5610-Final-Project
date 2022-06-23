import { Route, Routes } from "react-router-dom";
import App from "./App";
import { FeaturedView } from "./view/featured";
import { IndexPageView } from "./view/index-page";
import { ProfileView } from "./view/protected/profile";
import Billing from "./view/protected/profile.billing";
import { ProfileIndexView } from "./view/protected/profile.index";
import { ShopView } from "./view/shop";
import { ShoppingCartView } from "./view/shopping-cart";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<IndexPageView />} />
        <Route path="profile" element={<ProfileView />}>
          <Route index element={<ProfileIndexView />} />
          <Route path="billing" element={<Billing />} />
        </Route>
        <Route path="shop" element={<ShopView />} />
        <Route path="featured" element={<FeaturedView />} />
        <Route path="shopping-cart" element={<ShoppingCartView />} />
      </Route>
    </Routes>
  );
};
