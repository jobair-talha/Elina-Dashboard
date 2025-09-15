import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import OrderList from "./pages/Order/OrderList";
import PosOrder from "./pages/Order/PosOrder";
import Products from "./pages/products";
import Category from "./pages/Category";
import SliderList from "./pages/slider";
import CreateCategory from "./pages/Category/create";
import CreateProductPage from "./pages/products/create";
import SiteSettings from "./pages/settings";
import CreateSlider from "./pages/slider/create";
import UpdateSlider from "./pages/slider/update";
import UpdateCategory from "./pages/Category/update";
import UpdateProductPage from "./pages/products/update";
import SupplierList from "./pages/Supplier";
import CreateSupplier from "./pages/Supplier/create";
import UpdateSupplier from "./pages/Supplier/update";
import AttributeList from "./pages/Attributes/attribute";
import CreateAttribute from "./pages/Attributes/attribute/create";
import UpdateAttribute from "./pages/Attributes/attribute/update";
import AttributeValueList from "./pages/Attributes/value";
import CreateAttributeValue from "./pages/Attributes/value/create";
import UpdateAttributeValue from "./pages/Attributes/value/update";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Order Pages */}
            <Route path="/pos-order" element={<PosOrder />} />
            <Route path="/order" element={<OrderList />} />

            {/* Product Pages */}
            <Route path="/product-list" element={<Products />} />
            <Route path="/new-product" element={<CreateProductPage />} />
            <Route
              path="/products/edit/:slug"
              element={<UpdateProductPage />}
            />

            {/* Category Pages */}
            <Route path="/category-list" element={<Category />} />
            <Route path="/new-category" element={<CreateCategory />} />
            <Route path="/update-category/:slug" element={<UpdateCategory />} />

            {/* Sliders Pages */}
            <Route path="/slider-list" element={<SliderList />} />
            <Route path="/new-slider" element={<CreateSlider />} />
            <Route path="/update-slider/:id" element={<UpdateSlider />} />
            
            {/* Supplier Route */}
            <Route path="/supplier-list" element={<SupplierList />} />
            <Route path="/new-supplier" element={<CreateSupplier />} />
            <Route path="/update-supplier/:id" element={<UpdateSupplier />} />

            {/* Attribute  */}

            <Route path="/attribute-list" element={<AttributeList />} />
            <Route path="/create-attribute" element={<CreateAttribute />} />
            <Route path="/update-attribute/:id" element={<UpdateAttribute />} />

            {/* Attribute value  */}

            <Route path="/attribute-value-list" element={<AttributeValueList />} />
            <Route
              path="/create-attribute-value"
              element={<CreateAttributeValue />}
            />
            <Route
              path="/update-attribute-value/:id"
              element={<UpdateAttributeValue />}
            />

            {/* Settings Page */}
            <Route path="/settings" element={<SiteSettings />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
