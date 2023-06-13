import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

import EntryData from "../pages/Entrydata/EntryData"
import DonwloadData from "../pages/DonwloadData/DonwloadData"
import Menu from "../pages/App002/Menu"
import Role from "../pages/App003/Role"
import RoleAkses from "../pages/App004/RoleAkses"
import Company from "../pages/App005/Company"
import MasterPlant from "../pages/App006/MasterPlant"
import MasterPosition from "../pages/App009/MasterPosition"
import ChangeUser from "../pages/App007/ChangeUser"
import User from "../pages/App008/User"
import Divisi from "../pages/App011/Divisi"
import Team from "../pages/App013/Team"
import MstDtlsettings from "../pages/App010/MstDtlsettings"
import Map from "../pages/App014/Map"
import Vendor from "../pages/App015/Vendor"
import Wilayah from "pages/App016/Wilayah"
import Unitcamp from "../pages/App017/Unitcamp"
import Kabupaten from "../pages/App018/Kabupaten"
import Silviculture from "pages/App019/Silviculture"
import JenisPohon from "pages/App020/JenisPohon"
import Pekerjaan from "pages/App021/Pekerjaan"
import Harga from "pages/App022/Harga"
import AspekPekerjaan from "pages/App023/AspekPekerjaan"
import RumusMaterial from "pages/App024/RumusMaterial"
import Kriteria from "pages/App025/Kriteria"
import Petak from "pages/App026/Petak"
import Spk from "pages/App027/Spk"
import KonfirmSpk from "pages/App028/KonfirmSpk"
import PersetujuanSPK from "pages/App029/PersetujuanSPK"
import ListUploadTargetPanen from "pages/App031/UploadTarget"
import UploadTargetPanen from "pages/App031/UploadTargetPanen"
import RumusTegakan from "pages/App032/RumusTegakan"
import LaporanTargetHPanen from "pages/App030/LaporanTargetHPanen"
import TrcKegiatanPanen from "pages/App033/TrcKegiatanPanen"
import MappingPerencanaanSpkQc from "pages/App034/MappingPerencanaanSpkQc"
import WorkingOrder from "pages/App035/WorkingOrder"
import PetakQc from "pages/App036/PetakQc"
import LaporanPersetujuanSpk from "pages/App037/LaporanPersetujuanSPK"
import MappingPersetujuan from "pages/App038/MappingPersetujuan"
import LaporanMonitoring from "pages/App039/LaporanMonitoring"
import MasterKriteria from "pages/App040/MasterKriteria"


const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/entrydata", component: EntryData },
  { path: "/donwload", component: DonwloadData },
  { path: "/app002", component: Menu },
  { path: "/app003", component: Role },
  { path: "/app004", component: RoleAkses },
  { path: "/app005", component: Company },
  { path: "/app006", component: MasterPlant },
  { path: "/app007", component: ChangeUser },
  { path: "/app008", component: User },
  { path: "/app010", component: MstDtlsettings },
  { path: "/app009", component: MasterPosition },
  { path: "/app011", component: Divisi },
  { path: "/app013", component: Team },
  { path: "/app014", component: Map },
  { path: "/app015", component: Vendor },
  { path: "/app016", component : Wilayah},
  { path: "/app017", component: Unitcamp },
  { path: "/app018", component: Kabupaten },
  { path: "/app019", component: Silviculture },
  { path: "/app020", component: JenisPohon },
  { path: "/app021", component: Pekerjaan },
  { path: "/app022", component: Harga },
  { path: "/app023", component: AspekPekerjaan },
  { path: "/app024", component: RumusMaterial},
  { path: "/app025", component: Kriteria},
  { path: "/app026", component: Petak},
  { path: "/app027", component: Spk},
  { path: "/app028", component: KonfirmSpk},
  { path: "/app029", component: PersetujuanSPK},
  { path: "/app031", component: ListUploadTargetPanen},
  { path: "/app031B", component: UploadTargetPanen},
  { path: "/app032", component: RumusTegakan},
  { path: "/app033", component: TrcKegiatanPanen},
  { path: "/app030", component: LaporanTargetHPanen},
  { path: "/app034", component: MappingPerencanaanSpkQc},
  { path: "/app035", component: WorkingOrder},
  { path: "/app036", component: PetakQc},
  { path: "/app037", component: LaporanPersetujuanSpk},
  { path: "/app038", component: MappingPersetujuan},
  { path: "/app039", component: LaporanMonitoring},
  { path: "/app040", component: MasterKriteria},

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
