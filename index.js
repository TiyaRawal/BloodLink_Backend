let express = require("express");
const { connectDb } = require("./db/connection");
let dotenv = require("dotenv");
let cors = require("cors");
let helmet = require("helmet");
let mongoSanitize = require("express-mongo-sanitize");
dotenv.config();

const Login = require("./Common/Login");
const Register = require("./Common/Register");
const AdminLogin = require("./Admin/AdminLogin");
const PatientRegister = require("./Patient/PatientRegister");
const DonorRegister = require("./Donor/DonorRegister");
const DonorLogin = require("./Donor/DonorLogin");
const AuthMiddleWare = require("./Auth/Middleware");
const ScheduleDonation = require("./Donor/BloodDonationScheduleAPI");
const BloodRequest = require("./Patient/BloodRequestAPI");
const DeleteBloodStock = require("./Admin/DeleteBloodStock");
const UpdateBloodStock = require("./Admin/UpdateBloodStock");
const GetBloodStock = require("./Common/GetBloodStock");
const AddBloodStock = require("./Admin/AddBloodStock");
const GetPatientRequests = require("./Admin/GetPatientRequests");
const GetDonationRequests = require("./Admin/GetDonationRequest");
const FilterBloodByGroup = require("./Common/FilterBloodByGroup");
const UpdatePatientProfile = require("./Patient/UpdatePatientProfile");
const ForgotPassword = require("./Common/ForgotPassword");
const ResetPatientPassword = require("./Patient/ResetPatientPassword");
const PatientHistoryAPI = require("./Patient/PatientHistoryAPI");
const DonorHistoryAPI = require("./Donor/DonorHistoryAPI");
const AdminStatisticsAPI = require("./Admin/AdminStatisticsAPI");
const BloodAvailabilitySearchAPI = require("./Common/BloodAvailabilitySearchAPI");
const CreateNotification = require("./Admin/CreateNotification");
const GetNotification = require("./Admin/GetNotification");
const UpdateNotification = require("./Admin/UpdateNotification");
const DeleteNotification = require("./Admin/DeleteNotification");
const RateLimit = require("./Auth/RateLimit");
const UploadProfileImageAPI = require("./Common/UploadProfileImageAPI");
const profileUpload = require("./Auth/Multer");
const GetBloodGroupsAPI = require("./Common/GetBloodGroupAPI");
const { UpdateSettings, GetSettings } = require("./Admin/SettingsAPI");
const DeleteDonor = require("./Admin/DeleteDonorAPI");
const CancelDonationScheduleAPI = require("./Donor/CancelDonationScheduleAPI");
const Logout = require("./Common/Logout");
const DonorApproval = require("./Admin/DonorApprovalAPI");
const AuditLogAPI = require("./Admin/AuditLogAPI");
const GetAuditLogs = require("./Admin/GetAuditLogAPI");
const EditPatientRequest = require("./Admin/EditPatientRequestAPI");
const CreatePushNotification = require("./Common/PushNotificationAPI");
const SearchPatientByBloodGroup = require("./Patient/SearchPatientByBloodGroup");
const ValidatePatientRegister = require("./Auth/Validation");
const CSVUpload = require("./Auth/CSVUpload");
const ImportBloodStock = require("./Admin/ImportBloodStockAPI");
const ExportDonorData = require("./Admin/ExportDonorDataAPI");
const HospitalRegister = require("./Common/HospitalRegister");
const RescheduleAppointment = require("./Patient/RescheduleAppointment");
const ErrorLogger = require("./Common/ErrorLogger");
const APILogger = require("./Common/APILogger");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const CreateIndexes = require("./Common/Indexes");

let app = express();
let v1 = express.Router();

app.use(helmet());

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(mongoSanitize());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(RateLimit);
app.use(APILogger);

let PORT = 8000;

connectDb();
CreateIndexes();

app.get("/", (req, res) => {
  res.send("BloodLink Server is running");
});

v1.post("/register", Register);
v1.post("/login", Login);
v1.post("/logout", AuthMiddleWare(), Logout);

v1.post("/adminlogin", AdminLogin);
v1.post("/admin/bloodstock", AuthMiddleWare("admin"), AddBloodStock);
v1.get("/admin/bloodstock", AuthMiddleWare("admin"), GetBloodStock);
v1.put("/admin/bloodstock/:id", AuthMiddleWare("admin"), UpdateBloodStock);
v1.delete("/admin/bloodstock/:id", AuthMiddleWare("admin"), DeleteBloodStock);
v1.get("/admin/patientrequests", AuthMiddleWare("admin"), GetPatientRequests);
v1.get("/admin/donationrequests", AuthMiddleWare("admin"), GetDonationRequests);
v1.get("/admin/statistics", AuthMiddleWare("admin"), AdminStatisticsAPI);
v1.post("/admin/notification", AuthMiddleWare("admin"), CreateNotification);
v1.get("/admin/notification", AuthMiddleWare("admin"), GetNotification);
v1.put("/admin/notification/:id", AuthMiddleWare("admin"), UpdateNotification);
v1.delete("/admin/notification/:id", AuthMiddleWare("admin"), DeleteNotification);
v1.get("/admin/settings", AuthMiddleWare("admin"), GetSettings);
v1.put("/admin/settings", AuthMiddleWare("admin"), UpdateSettings);
v1.delete("/admin/donor/:id", AuthMiddleWare("admin"), DeleteDonor);
v1.put("/admin/donor/:id/approval", AuthMiddleWare("admin"), DonorApproval);
v1.post("/admin/auditlog", AuthMiddleWare("admin"), AuditLogAPI);
v1.get("/admin/auditlogs", AuthMiddleWare("admin"), GetAuditLogs);
v1.put("/admin/patientrequest/:id", AuthMiddleWare("admin"), EditPatientRequest);
v1.post("/notification", AuthMiddleWare(), CreatePushNotification);
v1.post("/admin/bloodstock/import", AuthMiddleWare("admin"), CSVUpload.single("file"), ImportBloodStock);
v1.get("/admin/donors/export", AuthMiddleWare("admin"), ExportDonorData);

v1.post("/patient/register", ValidatePatientRegister, PatientRegister);
v1.post("/patient/forgotpassword", ForgotPassword);
v1.post("/patient/resetpassword", ResetPatientPassword);
v1.post("/patient/bloodrequest", AuthMiddleWare("patient"), BloodRequest);
v1.get("/patient/bloodstock", AuthMiddleWare("patient"), GetBloodStock);
v1.put("/patient/profile", AuthMiddleWare("patient"), UpdatePatientProfile);
v1.get("/patient/history", AuthMiddleWare("patient"), PatientHistoryAPI);
v1.get("/patient/search", AuthMiddleWare(), SearchPatientByBloodGroup);
v1.put("/patient/appointment/:id/reschedule", AuthMiddleWare("patient"), RescheduleAppointment);

v1.post("/donor/register", DonorRegister);
v1.post("/donor/login", DonorLogin);
v1.post("/donor/scheduledonation", AuthMiddleWare("donor"), ScheduleDonation);
v1.get("/donor/bloodstock", AuthMiddleWare("donor"), GetBloodStock);
v1.get("/donor/history", AuthMiddleWare("donor"), DonorHistoryAPI);
v1.put("/donor/scheduledonation/:id/cancel", AuthMiddleWare("donor"), CancelDonationScheduleAPI);

v1.get("/bloodgroups", GetBloodGroupsAPI);
v1.get("/bloodstock/filter", AuthMiddleWare(), FilterBloodByGroup);
v1.get("/bloodstock/availability", AuthMiddleWare(), BloodAvailabilitySearchAPI);
v1.post("/hospitalregister", HospitalRegister);
v1.post("/profile/upload", AuthMiddleWare(), profileUpload.single("profileImage"), UploadProfileImageAPI);

app.use("/api/v1", v1);
app.use(ErrorLogger);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
