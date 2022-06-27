import { createSearchParams, NavigateFunction, Route, Routes } from "react-router-dom";
import { CheckOutView } from "view/check-out";
import { OrderCompleteView } from "view/order-complete";
import { ProductDetail } from "view/product-detail";
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
        <Route path="product-detail" element={<ProductDetail />} />
        <Route path="featured" element={<FeaturedView />} />
        <Route path="shopping-cart" element={<ShoppingCartView />} />
        <Route path="order" element={<CheckOutView />} />
        <Route path="order-complete" element={<OrderCompleteView />} />
      </Route>
    </Routes>
  );
};

export const visitDetailPage = <T extends { _id: string }>(item: T, navigate: NavigateFunction, reload: boolean = false) => {
  const params = { _id: item._id };
  navigate({
    pathname: '/product-detail',
    search: `?${createSearchParams(params)}`,
  })
  reload && window.location.reload();
}