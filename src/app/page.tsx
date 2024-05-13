import HomeLayout from "./HomePage/page";
import Menu from "./menu/page";


export default function Page() {
  return (
    <div className="bg-custom-gradient text-customColor font-customFont">
      <HomeLayout />
      {/* <Menu/> */}
    </div>
  )
}