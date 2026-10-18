import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, collection, updateDoc } from 'firebase/firestore';

const SvgIcon = ({ size = 20, className = "", children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const Trophy = (props) => (
  <SvgIcon {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </SvgIcon>
);

const Upload = (props) => (
  <SvgIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </SvgIcon>
);

const CheckCircle2 = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </SvgIcon>
);

const ChevronRight = (props) => (
  <SvgIcon {...props}>
    <polyline points="9 18 15 12 9 6" />
  </SvgIcon>
);

const X = (props) => (
  <SvgIcon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </SvgIcon>
);

const Search = (props) => (
  <SvgIcon {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </SvgIcon>
);

const ShieldCheck = (props) => (
  <SvgIcon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </SvgIcon>
);

const CreditCard = (props) => (
  <SvgIcon {...props}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </SvgIcon>
);

const Camera = (props) => (
  <SvgIcon {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </SvgIcon>
);

const Info = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </SvgIcon>
);

const Home = (props) => (
  <SvgIcon {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </SvgIcon>
);

const Ticket = (props) => (
  <SvgIcon {...props}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </SvgIcon>
);

const Gift = (props) => (
  <SvgIcon {...props}>
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </SvgIcon>
);

const HelpCircle = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </SvgIcon>
);

const Lock = (props) => (
  <SvgIcon {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </SvgIcon>
);

const LayoutDashboard = (props) => (
  <SvgIcon {...props}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </SvgIcon>
);

const Users = (props) => (
  <SvgIcon {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </SvgIcon>
);

const Check = (props) => (
  <SvgIcon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </SvgIcon>
);

const XCircle = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </SvgIcon>
);

const Download = (props) => (
  <SvgIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </SvgIcon>
);

const Copy = (props) => (
  <SvgIcon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </SvgIcon>
);

const QrCode = (props) => (
  <SvgIcon {...props}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </SvgIcon>
);

const Eye = (props) => (
  <SvgIcon {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </SvgIcon>
);

const Settings = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </SvgIcon>
);

const AlertTriangle = (props) => (
  <SvgIcon {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </SvgIcon>
);

const Clock = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </SvgIcon>
);

const Plus = (props) => (
  <SvgIcon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </SvgIcon>
);

const Trash2 = (props) => (
  <SvgIcon {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </SvgIcon>
);

// ==========================================
// CONFIGURACIÓN DE FIREBASE (CONECTADO)
// ==========================================
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBCukFgcgsRVX2smOu7Zor1h-H1VHq0JiI",
  authDomain: "sorteo-paucarbambilla.firebaseapp.com",
  projectId: "sorteo-paucarbambilla",
  storageBucket: "sorteo-paucarbambilla.firebasestorage.app",
  messagingSenderId: "48622644220",
  appId: "1:48622644220:web:cd5e4fc1b4be77df0ce079"
};

let db = null;
try {
  const app = initializeApp(FIREBASE_CONFIG);
  db = getFirestore(app);
} catch (error) {
  console.warn("Aviso al iniciar Firebase:", error);
}

// ==========================================
// CONFIGURACIÓN GLOBAL POR DEFECTO
// ==========================================
const DEFAULT_CONFIG = {
  brandName: "CUADRILLA NIÑO JESÚS",
  brandSubtitle: "DE PAUCARBAMBILLA",
  logo: "https://i.imgur.com/2RISwHk.png",
  heroImage: "https://i.imgur.com/NwPwvhP.png",
  campaignName: "GRAN SORTEO PRO-FONDOS",
  ticketPrice: 15.00,
  deadlineDate: "2026-12-20T23:59:59",
  drawDate: "2026-12-25T15:00:00",
  yapeNumber: "987 654 321",
  plinNumber: "912 345 678",
  accountHolder: "Tesorero: Juan Pérez",
  yapeQr: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=YAPE-CUADRILLA-NJP-987654321",
  plinQr: "https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=PLIN-CUADRILLA-NJP-912345678",
  whatsapp: "987654321",
  supportHours: "Lunes a Sábado de 9:00 a.m. a 8:00 p.m.",
  socialLinks: { facebook: "https://facebook.com", instagram: "https://instagram.com" },
  tieBreakerRule: "En caso de empate en cantidad de tickets acumulados, ocupa el puesto superior quien haya registrado y validado primero su compra en el sistema.",
  prizes: [
    {
      id: 1,
      name: "S/ 5,000 en Efectivo",
      category: "Premio Mayor",
      qty: 1,
      desc: "Premio mayor del sorteo. Dinero en efectivo transferido o entregado directamente al ganador.",
      image: "https://images.unsplash.com/photo-1554672723-b208dc85134f?auto=format&fit=crop&w=1000&q=80",
      isMain: true
    },
    {
      id: 2,
      name: "Refrigeradora LG 2 Puertas",
      category: "Línea Blanca",
      qty: 1,
      desc: "Refrigeradora No Frost Inverter.",
      image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800",
      isMain: false
    },
    {
      id: 3,
      name: "Smart TV Samsung 55\"",
      category: "Tecnología",
      qty: 2,
      desc: "Resolución 4K UHD.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
      isMain: false
    },
    {
      id: 4,
      name: "Canasta de Víveres Premium",
      category: "Canasta",
      qty: 5,
      desc: "Valorizada en S/ 300 cada una.",
      image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=800",
      isMain: false
    }
  ]
};

const INITIAL_DEMO_APPLICATIONS = [
  {
    id: "SOL-1001",
    docType: "DNI",
    document: "45678901",
    names: "Juan Carlos",
    surnames: "Pérez Gómez",
    phone: "987111222",
    department: "Huánuco",
    paymentMethod: "yape",
    operationNumber: "8849201",
    totalAmount: 75.00,
    estimatedTickets: 5,
    status: "approved",
    rejectionReason: "",
    fileUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    date: "2026-10-15T10:30:00.000Z"
  },
  {
    id: "SOL-1002",
    docType: "DNI",
    document: "12345678",
    names: "María Elena",
    surnames: "Córdova Rojas",
    phone: "962333444",
    department: "Huánuco",
    paymentMethod: "plin",
    operationNumber: "5530192",
    totalAmount: 45.00,
    estimatedTickets: 3,
    status: "approved",
    rejectionReason: "",
    fileUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    date: "2026-10-16T14:20:00.000Z"
  },
  {
    id: "SOL-1004",
    docType: "DNI",
    document: "70998877",
    names: "Andrés",
    surnames: "Salazar Vega",
    phone: "944555666",
    department: "Lima",
    paymentMethod: "yape",
    operationNumber: "9920114",
    totalAmount: 30.00,
    estimatedTickets: 2,
    status: "pending",
    rejectionReason: "",
    fileUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    date: "2026-10-17T16:40:00.000Z"
  }
];

const INITIAL_DEMO_TICKETS = [
  { id: "T-1", code: "NJP-00101", appId: "SOL-1001", alias: "Juan P.", document: "45678901", fullName: "Juan Carlos Pérez Gómez", phone: "987111222", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-15T10:35:00.000Z" },
  { id: "T-2", code: "NJP-00102", appId: "SOL-1001", alias: "Juan P.", document: "45678901", fullName: "Juan Carlos Pérez Gómez", phone: "987111222", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-15T10:35:00.000Z" },
  { id: "T-3", code: "NJP-00103", appId: "SOL-1001", alias: "Juan P.", document: "45678901", fullName: "Juan Carlos Pérez Gómez", phone: "987111222", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-15T10:35:00.000Z" },
  { id: "T-4", code: "NJP-00104", appId: "SOL-1001", alias: "Juan P.", document: "45678901", fullName: "Juan Carlos Pérez Gómez", phone: "987111222", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-15T10:35:00.000Z" },
  { id: "T-5", code: "NJP-00105", appId: "SOL-1001", alias: "Juan P.", document: "45678901", fullName: "Juan Carlos Pérez Gómez", phone: "987111222", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-15T10:35:00.000Z" },
  { id: "T-6", code: "NJP-00106", appId: "SOL-1002", alias: "María C.", document: "12345678", fullName: "María Elena Córdova Rojas", phone: "962333444", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-16T14:25:00.000Z" },
  { id: "T-7", code: "NJP-00107", appId: "SOL-1002", alias: "María C.", document: "12345678", fullName: "María Elena Córdova Rojas", phone: "962333444", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-16T14:25:00.000Z" },
  { id: "T-8", code: "NJP-00108", appId: "SOL-1002", alias: "María C.", document: "12345678", fullName: "María Elena Córdova Rojas", phone: "962333444", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-16T14:25:00.000Z" },
  { id: "T-9", code: "NJP-00109", appId: "SOL-1003", alias: "Carlos R.", document: "11223344", fullName: "Carlos Ramírez", phone: "911222333", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-16T18:10:00.000Z" },
  { id: "T-10", code: "NJP-00110", appId: "SOL-1003", alias: "Carlos R.", document: "11223344", fullName: "Carlos Ramírez", phone: "911222333", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-16T18:10:00.000Z" },
  { id: "T-11", code: "NJP-00111", appId: "SOL-1005", alias: "Ana L.", document: "44556677", fullName: "Ana López", phone: "955666777", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-17T09:15:00.000Z" },
  { id: "T-12", code: "NJP-00112", appId: "SOL-1006", alias: "Luis F.", document: "99887766", fullName: "Luis Fernández", phone: "999888777", campaign: "GRAN SORTEO PRO-FONDOS", date: "2026-10-17T11:00:00.000Z" }
];

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null);
  const [firebaseConnected, setFirebaseConnected] = useState(false);

  const [applications, setApplications] = useState(INITIAL_DEMO_APPLICATIONS);
  const [verifiedTickets, setVerifiedTickets] = useState(INITIAL_DEMO_TICKETS);
  const [winners, setWinners] = useState([]);
  const [auditLogs, setAuditLogs] = useState([
    { id: "LOG-1", action: "Sistema Inicializado", detail: "Plataforma lista para recepción de solicitudes", admin: "Sistema", date: new Date().toISOString() }
  ]);

  useEffect(() => {
    if (!db) return;

    const configRef = doc(db, 'sorteo_njp_settings', 'main_config');
    const unsubConfig = onSnapshot(configRef, (snap) => {
      setFirebaseConnected(true);
      if (snap.exists()) {
        setConfig(prev => ({ ...prev, ...snap.data() }));
      }
    }, (error) => {
      console.warn("Modo local activo (revisa reglas de Firestore):", error);
    });

    const appsRef = collection(db, 'sorteo_njp_applications');
    const unsubApps = onSnapshot(appsRef, (snapshot) => {
      setFirebaseConnected(true);
      if (!snapshot.empty) {
        const appsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        const merged = [...appsData];
        INITIAL_DEMO_APPLICATIONS.forEach(demo => {
          if (!merged.some(a => a.id === demo.id)) merged.push(demo);
        });
        setApplications(merged);
      }
    }, (error) => console.warn("Error leyendo solicitudes:", error));

    const ticketsRef = collection(db, 'sorteo_njp_tickets');
    const unsubTickets = onSnapshot(ticketsRef, (snapshot) => {
      if (!snapshot.empty) {
        const ticketsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        const merged = [...INITIAL_DEMO_TICKETS];
        ticketsData.forEach(t => {
          if (!merged.some(m => m.code === t.code)) merged.push(t);
        });
        setVerifiedTickets(merged);
      }
    }, (error) => console.warn("Error leyendo tickets:", error));

    const winnersRef = collection(db, 'sorteo_njp_winners');
    const unsubWinners = onSnapshot(winnersRef, (snapshot) => {
      if (!snapshot.empty) {
        setWinners(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      }
    }, (error) => console.warn("Error leyendo ganadores:", error));

    const logsRef = collection(db, 'sorteo_njp_audit');
    const unsubLogs = onSnapshot(logsRef, (snapshot) => {
      if (!snapshot.empty) {
        const logsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        logsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAuditLogs(logsData);
      }
    }, (error) => console.warn("Error leyendo auditoría:", error));

    return () => {
      unsubConfig();
      unsubApps();
      unsubTickets();
      unsubWinners();
      unsubLogs();
    };
  }, []);

  const registerAuditLog = async (action, detail) => {
    const newLog = {
      id: `LOG-${Date.now()}`,
      action,
      detail,
      admin: "Tesorería Admin",
      date: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
    if (db) {
      try {
        await setDoc(doc(db, 'sorteo_njp_audit', newLog.id), newLog);
      } catch (e) {
        console.warn("Log guardado localmente:", e);
      }
    }
  };

  const saveConfigToCloud = async (newConfig) => {
    setConfig(newConfig);
    await registerAuditLog("Actualización de Configuración", `Campaña: ${newConfig.campaignName} | Ticket: S/ ${Number(newConfig.ticketPrice).toFixed(2)}`);
    if (db) {
      try {
        await setDoc(doc(db, 'sorteo_njp_settings', 'main_config'), newConfig);
      } catch (e) {
        console.warn("Configuración guardada localmente:", e);
      }
    }
  };

  const addApplication = async (appData) => {
    const newId = `SOL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp = {
      ...appData,
      id: newId,
      status: 'pending',
      rejectionReason: '',
      date: new Date().toISOString()
    };

    setApplications(prev => [newApp, ...prev]);

    if (db) {
      try {
        await setDoc(doc(db, 'sorteo_njp_applications', newId), newApp);
      } catch (error) {
        console.warn("Solicitud guardada localmente:", error);
      }
    }
    return newId;
  };

  const approveApplication = async (appId) => {
    const appData = applications.find(a => a.id === appId);
    if (!appData || appData.status === 'approved') return;

    // Evitar duplicación si ya existen tickets emitidos para esta solicitud
    const existingForApp = verifiedTickets.filter(t => t.appId === appId);
    if (existingForApp.length > 0) return;

    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'approved', rejectionReason: '' } : a));

    const ticketsToGenerate = Math.max(1, Number(appData.estimatedTickets) || 1);
    const firstName = (appData.names || 'Participante').trim().split(' ')[0];
    const surnameInitial = (appData.surnames || '').trim().charAt(0);
    const aliasName = `${firstName} ${surnameInitial ? surnameInitial + '.' : ''}`.trim();
    const baseNum = 100 + verifiedTickets.length + 1;
    const generated = [];

    for (let i = 0; i < ticketsToGenerate; i++) {
      const ticketObj = {
        id: `T-${Date.now()}-${i}`,
        code: `NJP-${String(baseNum + i).padStart(5, '0')}`,
        appId: appId,
        document: appData.document,
        fullName: `${appData.names} ${appData.surnames}`.trim(),
        phone: appData.phone,
        alias: aliasName,
        campaign: config.campaignName,
        date: new Date().toISOString()
      };
      generated.push(ticketObj);
    }

    setVerifiedTickets(prev => [...prev, ...generated]);
    await registerAuditLog("Solicitud Aprobada", `${appId} (${appData.names} ${appData.surnames}) - Emitidos ${ticketsToGenerate} tickets`);

    if (db) {
      try {
        await setDoc(doc(db, 'sorteo_njp_applications', appId), { ...appData, status: 'approved', rejectionReason: '' });
        for (const t of generated) {
          await setDoc(doc(db, 'sorteo_njp_tickets', t.id), t);
        }
      } catch (error) {
        console.warn("Aprobación guardada localmente:", error);
      }
    }
  };

  const rejectApplication = async (appId, reason = "El comprobante no coincide o el número de operación es inválido.") => {
    const appData = applications.find(a => a.id === appId);
    if (!appData) return;

    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'rejected', rejectionReason: reason } : a));
    await registerAuditLog("Solicitud Rechazada", `${appId} - Motivo: ${reason}`);

    if (db) {
      try {
        await setDoc(doc(db, 'sorteo_njp_applications', appId), { ...appData, status: 'rejected', rejectionReason: reason });
      } catch (error) {
        console.warn("Rechazo guardado localmente:", error);
      }
    }
  };

  const publishWinner = async (winnerData) => {
    const newWinner = {
      id: `WIN-${Date.now()}`,
      ...winnerData,
      campaign: config.campaignName,
      date: new Date().toISOString()
    };
    setWinners(prev => [newWinner, ...prev]);
    await registerAuditLog("Ganador Publicado", `Premio: ${winnerData.prizeName} - Ticket: ${winnerData.ticketCode}`);

    if (db) {
      try {
        await setDoc(doc(db, 'sorteo_njp_winners', newWinner.id), newWinner);
      } catch (e) {
        console.warn("Ganador guardado localmente:", e);
      }
    }
  };

  const openAdminAccess = () => {
    if (isAdminAuthenticated) {
      setIsAdminView(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <AppContext.Provider value={{
      config, setConfig, saveConfigToCloud,
      isAdminView, setIsAdminView,
      isAdminAuthenticated, setIsAdminAuthenticated,
      isLoginModalOpen, setIsLoginModalOpen,
      openAdminAccess,
      isRegisterModalOpen, setIsRegisterModalOpen,
      isQrModalOpen, setIsQrModalOpen,
      legalModalType, setLegalModalType,
      firebaseConnected,
      applications, addApplication, approveApplication, rejectApplication,
      verifiedTickets,
      winners, publishWinner,
      auditLogs
    }}>
      {children}
    </AppContext.Provider>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-[#12161C] border border-gray-800 rounded-2xl shadow-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', className = "", onClick, type = "button", disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  const variants = {
    primary: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-300 hover:to-yellow-500 shadow-[0_0_15px_rgba(245,197,66,0.3)]",
    secondary: "bg-[#1A202C] text-white border border-gray-700 hover:border-red-800/50 hover:bg-[#252D3D]",
    danger: "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", value, onChange, placeholder, required = false, icon: Icon, error }) => (
  <div className="mb-4">
    {label && <label className="block text-sm text-gray-400 mb-2">{label} {required && <span className="text-yellow-500">*</span>}</label>}
    <div className="relative">
      {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"><Icon size={18} /></div>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full bg-[#0A0D14] border ${error ? 'border-red-500' : 'border-gray-700'} rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 transition-colors ${Icon ? 'pl-10' : ''}`}
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Countdown = ({ targetDate }) => {
  const { config } = useContext(AppContext);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
        setIsFinished(false);
      } else {
        setIsFinished(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-[#1A202C] border border-[#8B0000]/30 rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center shadow-[0_0_15px_rgba(139,0,0,0.1)]">
        <span className="text-2xl sm:text-4xl font-black text-yellow-400 font-mono tracking-wider">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs text-gray-400 mt-2 uppercase font-semibold tracking-widest">{label}</span>
    </div>
  );

  return (
    <div className="py-8 bg-gradient-to-b from-[#080A0C] to-[#12161C] border-y border-red-900/30">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 uppercase tracking-wide">
          {isFinished ? "¡REGISTRO DE PARTICIPACIONES CERRADO!" : "Cierre de Venta de Tickets en:"}
        </h3>
        {!isFinished && (
          <div className="flex justify-center gap-3 sm:gap-6">
            <TimeUnit value={timeLeft.days} label="Días" />
            <span className="text-2xl sm:text-4xl font-bold text-red-900/50 self-start mt-2 sm:mt-4">:</span>
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <span className="text-2xl sm:text-4xl font-bold text-red-900/50 self-start mt-2 sm:mt-4">:</span>
            <TimeUnit value={timeLeft.minutes} label="Minutos" />
            <span className="text-2xl sm:text-4xl font-bold text-red-900/50 self-start mt-2 sm:mt-4">:</span>
            <TimeUnit value={timeLeft.seconds} label="Segundos" />
          </div>
        )}
        <p className="text-xs text-gray-400 mt-4">
          Fecha del Sorteo Central: <strong className="text-yellow-500">{new Date(config.drawDate).toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong> (Hora Lima)
        </p>
      </div>
    </div>
  );
};

const Header = () => {
  const { config, openAdminAccess, winners } = useContext(AppContext);
  return (
    <header className="sticky top-0 z-40 bg-[#080A0C]/95 backdrop-blur-md border-b border-red-900/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={config.logo} alt="Logo" referrerPolicy="no-referrer" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(245,197,66,0.3)]" />
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-black text-white tracking-tighter leading-none">
              {config.brandName}
            </h1>
            <span className="text-[10px] md:text-xs text-yellow-500 tracking-widest uppercase">{config.brandSubtitle}</span>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#premios" className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-colors">Premios</a>
          <a href="#pasos" className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-colors">Cómo Participar</a>
          <a href="#consultar" className="text-sm font-semibold text-gray-300 hover:text-yellow-400 transition-colors">Consultar Tickets</a>
          {winners.length > 0 && (
            <a href="#ganadores" className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-1">
              <Trophy size={15} /> Ganadores
            </a>
          )}
          <button onClick={openAdminAccess} className="text-xs text-red-800 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer">
            <Lock size={12}/> Admin
          </button>
        </nav>
      </div>
    </header>
  );
};

const HeroCarousel = () => {
  const { config, setIsRegisterModalOpen } = useContext(AppContext);
  const mainPrize = config.prizes.find(p => p.isMain) || config.prizes[0];

  return (
    <section className="relative w-full overflow-hidden bg-[#080A0C] h-[60vh] md:h-[75vh] flex items-center">
      {/* Niño Jesús posicionado a la derecha, completo y suavemente difuminado */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <div className="w-full md:w-2/3 lg:w-1/2 h-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#080A0C] via-[#080A0C]/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0C] via-transparent to-[#080A0C]/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#080A0C]/80 via-transparent to-transparent z-10" />
          <img 
            src={config.heroImage} 
            alt="Niño Jesús de Paucarbambilla" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain object-right opacity-75 blur-[0.5px] scale-95 pr-0 md:pr-8"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-900/40 border border-red-500/30 text-yellow-400 text-xs font-bold tracking-widest mb-6 uppercase shadow-lg shadow-red-900/20">
            {config.campaignName}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
            GRAN SORTEO DE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">{mainPrize.name.toUpperCase()}</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl line-clamp-3 md:line-clamp-none">
            Apoya a la Cuadrilla Niño Jesús de Paucarbambilla para la confección de nuestros nuevos vestuarios. ¡Participa en nuestro gran sorteo y gana increíbles premios!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setIsRegisterModalOpen(true)} className="text-lg px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-red-700 to-red-900 text-white hover:from-red-600 hover:to-red-800 shadow-[0_0_15px_rgba(139,0,0,0.5)] border border-red-500/50">
              <Ticket size={24} /> RECLAMAR TICKETS
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('premios').scrollIntoView({behavior: 'smooth'})} className="text-lg px-8 py-4 w-full sm:w-auto">
              Ver todos los premios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const LeaderboardSection = () => {
  const { verifiedTickets } = useContext(AppContext);
  
  const getTopPlayers = () => {
    const counts = {};
    verifiedTickets.forEach(ticket => {
      if (!counts[ticket.alias]) counts[ticket.alias] = 0;
      counts[ticket.alias]++;
    });
    
    return Object.entries(counts)
      .map(([alias, tickets]) => ({ alias, tickets }))
      .sort((a, b) => b.tickets - a.tickets)
      .slice(0, 5);
  };

  const topPlayers = getTopPlayers();

  return (
    <section className="py-16 bg-[#0c0f14] border-y border-red-900/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-500" /> MAYORES COLABORADORES <Trophy className="text-yellow-500" />
          </h2>
          <p className="text-gray-400 text-sm">Posiciones calculadas con los tickets aprobados. ¡Gracias por apoyar a la cuadrilla!</p>
        </div>

        <div className="max-w-3xl mx-auto bg-[#12161C] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl relative">
          {topPlayers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Aún no hay colaboradores registrados. ¡Sé el primero!</div>
          ) : (
            topPlayers.map((user, index) => (
              <div key={index} className={`flex items-center justify-between p-4 sm:p-6 border-b border-gray-800/50 last:border-0 ${index === 0 ? 'bg-red-900/10' : 'hover:bg-[#1A202C] transition-colors'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-inner
                    ${index === 0 ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-black shadow-yellow-500/50' : 
                      index === 1 ? 'bg-gray-300 text-gray-800' : 
                      index === 2 ? 'bg-orange-600 text-orange-100' : 'bg-gray-800 text-gray-400'}`}>
                    {index + 1}
                  </div>
                  <span className={`font-bold text-lg ${index === 0 ? 'text-yellow-400' : 'text-white'}`}>{user.alias}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-white">{user.tickets}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">Tickets</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  const { config, setIsRegisterModalOpen, setIsQrModalOpen } = useContext(AppContext);
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ''));
    setCopiedText(label);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const steps = [
    { num: 1, title: "Realiza el Pago", desc: "Usa Yape o Plin a los números oficiales de tesorería.", icon: CreditCard },
    { num: 2, title: "Guarda Captura", desc: "Asegúrate que se vea fecha, monto y número de operación.", icon: Camera },
    { num: 3, title: "Sube tu Voucher", desc: "Adjunta la imagen aquí en nuestro sistema.", icon: Upload },
    { num: 4, title: "Recibe tu Ticket", desc: "Una vez validado, podrás descargar tu ticket virtual.", icon: CheckCircle2 }
  ];

  return (
    <section id="pasos" className="py-16 md:py-24 bg-[#080A0C]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">SOLO <span className="text-yellow-500">4 PASOS</span> PARA PARTICIPAR</h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Tu apoyo es importante. Adquiere tu ticket de forma rápida y 100% segura.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {steps.map((step) => (
            <Card key={step.num} className="p-6 text-left relative overflow-hidden group hover:border-red-900/50 transition-colors border-gray-800">
              <div className="absolute -right-4 -top-4 text-9xl font-black text-gray-800/20 group-hover:text-red-900/10 transition-colors z-0">
                {step.num}
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A202C] to-[#0A0D14] border border-gray-700 flex items-center justify-center mb-6 text-yellow-500 group-hover:text-white transition-colors shadow-inner">
                  <step.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Paso {step.num}: <br/>{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
                {step.num === 1 && (
                  <div className="mt-4 pt-3 border-t border-gray-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs bg-[#0A0D14] px-2.5 py-1.5 rounded-lg border border-gray-800">
                      <span className="text-purple-400 font-bold">Yape: {config.yapeNumber}</span>
                      <button onClick={() => handleCopy(config.yapeNumber, 'yape')} className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                        {copiedText === 'yape' ? '¡Copiado!' : <Copy size={14} />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs bg-[#0A0D14] px-2.5 py-1.5 rounded-lg border border-gray-800">
                      <span className="text-cyan-400 font-bold">Plin: {config.plinNumber}</span>
                      <button onClick={() => handleCopy(config.plinNumber, 'plin')} className="text-gray-400 hover:text-yellow-400 cursor-pointer">
                        {copiedText === 'plin' ? '¡Copiado!' : <Copy size={14} />}
                      </button>
                    </div>
                    <button onClick={() => setIsQrModalOpen(true)} className="w-full text-xs text-yellow-500 hover:text-yellow-400 font-bold flex items-center justify-center gap-1 pt-1 cursor-pointer">
                      <QrCode size={14} /> Ver Códigos QR
                    </button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <Button onClick={() => setIsRegisterModalOpen(true)} className="mx-auto text-lg px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-[0_0_20px_rgba(245,197,66,0.3)]">
          QUIERO PARTICIPAR AHORA
        </Button>
      </div>
    </section>
  );
};

const PrizesSection = () => {
  const { config, setIsRegisterModalOpen } = useContext(AppContext);
  const mainPrize = config.prizes.find(p => p.isMain);
  const secondaryPrizes = config.prizes.filter(p => !p.isMain);

  return (
    <section id="premios" className="py-20 bg-[#080A0C]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-4 uppercase">
          LO QUE PUEDES <span className="text-yellow-500">GANAR</span>
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">Increíbles premios en nuestro Gran Sorteo Pro-Fondos. ¡Participa y gana!</p>

        {/* Main Prize Highlight */}
        {mainPrize && (
          <Card className="mb-12 border-red-900/50 bg-gradient-to-br from-[#12161C] to-[#1a1212] relative group shadow-[0_0_30px_rgba(139,0,0,0.15)]">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black font-black text-xs px-4 py-2 rounded-bl-xl z-10 uppercase tracking-widest shadow-lg">
              {mainPrize.category}
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/5 h-64 md:h-[400px] relative overflow-hidden bg-[#1a1212]">
                <img src={mainPrize.image} alt={mainPrize.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a1212] via-[#1a1212]/40 to-transparent" />
              </div>
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative z-10 -ml-0 md:-ml-10">
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{mainPrize.name}</h3>
                <p className="text-gray-300 mb-8 text-lg bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-gray-800">{mainPrize.desc}</p>
                <Button onClick={() => setIsRegisterModalOpen(true)} className="w-full md:w-auto self-start bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-[0_0_15px_rgba(245,197,66,0.3)]">
                  Reclamar Tickets
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Secondary Prizes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryPrizes.map(prize => (
            <Card key={prize.id} className="flex flex-col group hover:-translate-y-2 transition-transform duration-300 border-gray-800">
              <div className="h-48 relative overflow-hidden bg-gray-900">
                <img src={prize.image} alt={prize.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-3 left-3 bg-red-900/80 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-full border border-red-500/50">
                  {prize.qty} DISPONIBLE{prize.qty > 1 ? 'S' : ''}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-1">{prize.category}</span>
                <h4 className="text-xl font-bold text-white mb-2">{prize.name}</h4>
                <p className="text-gray-400 text-sm flex-1 mb-6">{prize.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const TicketCheckSection = () => {
  const { config, applications, verifiedTickets } = useContext(AppContext);
  const [docToSearch, setDocToSearch] = useState('');
  const [phoneLast4, setPhoneLast4] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTicketForPrint, setSelectedTicketForPrint] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!docToSearch.trim()) return;

    const cleanDoc = docToSearch.trim();
    const cleanPhone4 = phoneLast4.trim();

    const userApps = applications.filter(a => {
      const matchDoc = a.document === cleanDoc;
      if (!cleanPhone4) return matchDoc;
      return matchDoc && (a.phone || '').endsWith(cleanPhone4);
    });

    const userTickets = verifiedTickets.filter(t => {
      const matchDoc = t.document === cleanDoc;
      if (!cleanPhone4) return matchDoc;
      return matchDoc && (!t.phone || t.phone.endsWith(cleanPhone4));
    });

    setSearchResult({
      apps: userApps,
      tickets: userTickets,
      totalApproved: userTickets.length
    });
    setHasSearched(true);
  };

  return (
    <section id="consultar" className="py-20 bg-[#0c0f14] border-t border-red-900/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase">Descarga tus <span className="text-yellow-500">Tickets</span></h2>
          <p className="text-gray-400">
            Ingresa tu número de DNI para consultar el estado de tu pago y obtener tus tickets virtuales.
            <span className="block text-xs text-gray-500 mt-1">
              (Prueba con DNI: <strong className="text-yellow-500">45678901</strong> o <strong className="text-yellow-500">12345678</strong>)
            </span>
          </p>
        </div>

        <Card className="p-6 md:p-10 mb-8 border-gray-800">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Search size={20} /></div>
              <input 
                type="text" 
                placeholder="Ingresa tu N° de Documento (DNI / CE)" 
                className="w-full bg-[#080A0C] border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-lg transition-all"
                value={docToSearch}
                onChange={(e) => setDocToSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-52">
              <input 
                type="text" 
                maxLength={4}
                placeholder="Últimos 4 cel (opcional)" 
                className="w-full bg-[#080A0C] border border-gray-700 rounded-xl py-4 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 text-base transition-all"
                value={phoneLast4}
                onChange={(e) => setPhoneLast4(e.target.value)}
              />
            </div>
            <Button type="submit" className="md:w-auto py-4 px-8 text-lg shrink-0">
              Consultar
            </Button>
          </form>
        </Card>

        {hasSearched && (
          <div>
            {searchResult.apps.length > 0 || searchResult.tickets.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#12161C] p-4 rounded-xl border border-gray-800 text-center">
                    <span className="block text-gray-500 text-xs uppercase mb-1">Solicitudes</span>
                    <span className="text-2xl font-bold text-white">{searchResult.apps.length}</span>
                  </div>
                  <div className="bg-[#12161C] p-4 rounded-xl border border-green-900/50 text-center">
                    <span className="block text-gray-400 text-xs uppercase mb-1">Tickets Aprobados</span>
                    <span className="text-2xl font-black text-green-400">{searchResult.totalApproved}</span>
                  </div>
                </div>

                {searchResult.tickets.length > 0 && (
                  <div className="bg-[#12161C] border border-gray-800 rounded-xl p-5">
                    <h4 className="text-white font-bold mb-3">Tus Códigos de Ticket Oficiales (Haz clic en cualquiera para ver/imprimir):</h4>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.tickets.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTicketForPrint(t)}
                          className="bg-[#080A0C] hover:bg-yellow-500 hover:text-black border border-yellow-500/40 text-yellow-400 font-mono font-bold px-3.5 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <Ticket size={15} /> {t.code || `NJP-0010${idx + 1}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <h4 className="text-white font-bold mb-4 mt-8">Historial de Solicitudes</h4>
                {searchResult.apps.map(app => (
                  <div key={app.id} className="bg-[#1A202C] border border-gray-700 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-gray-400">Ref: {app.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider
                          ${app.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                            app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                            'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                          {app.status === 'approved' ? 'Validado' : app.status === 'pending' ? 'En Revisión' : 'Rechazado'}
                        </span>
                      </div>
                      <p className="text-white font-medium text-sm">Pago reportado: S/ {Number(app.totalAmount).toFixed(2)} ({app.paymentMethod?.toUpperCase()})</p>
                      <p className="text-xs text-gray-500">Fecha: {new Date(app.date).toLocaleDateString()} | Operación: {app.operationNumber}</p>
                      {app.status === 'rejected' && app.rejectionReason && (
                        <p className="text-xs text-red-400 mt-1">Motivo de rechazo: {app.rejectionReason}</p>
                      )}
                    </div>
                    {app.status === 'approved' && searchResult.tickets.length > 0 && (
                      <Button onClick={() => setSelectedTicketForPrint(searchResult.tickets[0])} className="text-sm py-2 px-6 whitespace-nowrap bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 border-none">
                        <Download size={16} /> Ver / Imprimir Ticket
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[#12161C] rounded-2xl border border-gray-800">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info size={30} className="text-gray-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">No encontramos registros</h4>
                <p className="text-gray-400 max-w-md mx-auto">Verifica que el número ingresado sea correcto. Si acabas de realizar el pago, asegúrate de haber enviado tu solicitud en el botón "Reclamar Tickets".</p>
              </div>
            )}
          </div>
        )}

        {/* Modal de Ticket Oficial Imprimible */}
        {selectedTicketForPrint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="bg-[#12161C] border-2 border-yellow-500 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-red-900 to-[#12161C] p-5 flex items-center justify-between border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <img src={config.logo} alt="Logo" referrerPolicy="no-referrer" className="w-10 h-10 object-contain" />
                  <div>
                    <h4 className="text-white font-black text-sm leading-none">{config.brandName}</h4>
                    <span className="text-[10px] text-yellow-400 uppercase tracking-widest">{config.brandSubtitle}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedTicketForPrint(null)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center bg-[#080A0C] border border-dashed border-yellow-500/60 rounded-xl p-4">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">Código Oficial de Sorteo</span>
                  <span className="text-3xl font-black font-mono text-yellow-400 tracking-wider">{selectedTicketForPrint.code}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Campaña:</span>
                    <span className="text-white font-bold">{config.campaignName}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Titular:</span>
                    <span className="text-white font-medium">{selectedTicketForPrint.fullName || selectedTicketForPrint.alias}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">Documento:</span>
                    <span className="text-white font-mono">{selectedTicketForPrint.document}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estado:</span>
                    <span className="text-green-400 font-bold">VALIDADO OFICIAL</span>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="secondary" className="flex-1" onClick={() => setSelectedTicketForPrint(null)}>Cerrar</Button>
                  <Button className="flex-1" onClick={() => window.print()}>
                    <Download size={16} /> Imprimir / Guardar PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const WinnersSection = () => {
  const { winners } = useContext(AppContext);
  if (winners.length === 0) return null;

  return (
    <section id="ganadores" className="py-16 bg-[#080A0C] border-t border-red-900/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white uppercase">Ganadores <span className="text-yellow-500">Oficiales</span></h2>
          <p className="text-gray-400 text-sm mt-1">Resultados publicados por la junta directiva y tesorería.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {winners.map(w => (
            <Card key={w.id} className="p-6 border-yellow-500/40 bg-gradient-to-br from-[#12161C] to-[#1a1410]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-yellow-500 text-black">{w.prizeName}</span>
                <span className="text-xs text-gray-400">{new Date(w.date).toLocaleDateString()}</span>
              </div>
              <p className="text-2xl font-black font-mono text-yellow-400 mb-1">Ticket: {w.ticketCode}</p>
              <p className="text-white font-bold text-lg">Ganador(a): {w.winnerName}</p>
              {w.videoUrl && (
                <a href={w.videoUrl} target="_blank" rel="noreferrer" className="inline-block mt-3 text-xs text-yellow-500 underline">
                  Ver transmisión del sorteo
                </a>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { config } = useContext(AppContext);
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    { q: "¿Cómo adquiero mi ticket para el sorteo?", a: "Transfiere el monto correspondiente por Yape o Plin, tómale captura y súbela en el botón 'Reclamar Tickets'. Te asignaremos tus tickets virtuales tras validar el pago." },
    { q: "¿Cuánto cuesta cada ticket?", a: `El ticket tiene un valor de S/ ${Number(config.ticketPrice).toFixed(2)}. Todo lo recaudado será pro-fondos para la Cuadrilla.` },
    { q: "¿Cuándo y dónde será el sorteo?", a: "El sorteo se realizará presencialmente y será transmitido en vivo por nuestra página oficial de Facebook en la fecha indicada en el contador." },
    { q: "¿Cómo sé si mis tickets son válidos?", a: "Puedes usar la sección 'Consultar Tickets' ingresando tu número de DNI para ver e imprimir tus tickets aprobados." }
  ];

  return (
    <section id="faq" className="py-20 bg-[#080A0C]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-black text-center text-white mb-12 uppercase">Preguntas <span className="text-yellow-500">Frecuentes</span></h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden bg-[#12161C]">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-[#1A202C] transition-colors cursor-pointer"
              >
                <span className="font-bold text-white text-sm md:text-base">{faq.q}</span>
                <ChevronRight className={`text-yellow-500 transition-transform duration-300 shrink-0 ${openIdx === idx ? 'rotate-90' : ''}`} size={20} />
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out bg-[#0A0D14] ${openIdx === idx ? 'max-h-40 py-5 border-t border-gray-800' : 'max-h-0'}`}>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RegistrationModal = () => {
  const { config, isRegisterModalOpen, setIsRegisterModalOpen, addApplication } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [ticketQty, setTicketQty] = useState(1);
  const [formData, setFormData] = useState({
    amount: String(DEFAULT_CONFIG.ticketPrice),
    paymentMethod: 'yape',
    operationNumber: '',
    date: new Date().toISOString().split('T')[0],
    fileUrl: null,
    fileName: '',
    docType: 'DNI',
    document: '',
    names: '',
    surnames: '',
    phone: '',
    department: 'Huánuco',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdSolicitudeId, setCreatedSolicitudeId] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      amount: (ticketQty * Number(config.ticketPrice)).toFixed(2)
    }));
  }, [ticketQty, config.ticketPrice]);

  if (!isRegisterModalOpen) return null;

  const handleClose = () => {
    if (!isSubmitting) {
      setIsRegisterModalOpen(false);
      setTimeout(() => {
        setStep(1);
        setSuccess(false);
        setTicketQty(1);
        setFormData({
          ...formData,
          amount: String(config.ticketPrice),
          operationNumber: '',
          fileUrl: null,
          fileName: '',
          document: '',
          names: '',
          surnames: '',
          phone: '',
          terms: false
        });
      }, 300);
    }
  };

  const estTickets = Math.max(1, Math.floor(Number(formData.amount || 0) / Number(config.ticketPrice)));

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, fileUrl: reader.result, fileName: file.name }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const exactAmount = Number(formData.amount);
    const solId = await addApplication({
      ...formData,
      estimatedTickets: estTickets,
      totalAmount: exactAmount
    });
    setCreatedSolicitudeId(solId);
    setIsSubmitting(false);
    setSuccess(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5">
            <div className="bg-[#1A202C] p-4 rounded-xl border border-red-900/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-300">Precio por Ticket: <strong className="text-yellow-500">S/ {Number(config.ticketPrice).toFixed(2)}</strong></span>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setTicketQty(Math.max(1, ticketQty - 1))} className="w-8 h-8 rounded-lg bg-gray-800 text-white font-bold hover:bg-gray-700 cursor-pointer">-</button>
                  <span className="w-8 text-center font-black text-white">{ticketQty}</span>
                  <button type="button" onClick={() => setTicketQty(ticketQty + 1)} className="w-8 h-8 rounded-lg bg-yellow-500 text-black font-bold hover:bg-yellow-400 cursor-pointer">+</button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input label="Monto transferido (S/)" type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div className="flex-1 bg-black/50 rounded-xl p-3 border border-gray-800 text-center">
                  <span className="block text-xs text-gray-500 mb-1">Recibirás</span>
                  <span className="text-2xl font-black text-yellow-400">{estTickets} <span className="text-sm text-gray-400">Tickets</span></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'yape'})}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${formData.paymentMethod === 'yape' ? 'border-[#742284] bg-[#742284]/15' : 'border-gray-700 bg-[#12161C] hover:border-gray-500'}`}
              >
                <div className="w-9 h-9 bg-[#742284] text-white rounded-full flex items-center justify-center font-bold text-xs">YAPE</div>
                <span className="text-sm font-bold text-white">{config.yapeNumber}</span>
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, paymentMethod: 'plin'})}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${formData.paymentMethod === 'plin' ? 'border-[#00E4C3] bg-[#00E4C3]/15' : 'border-gray-700 bg-[#12161C] hover:border-gray-500'}`}
              >
                <div className="w-9 h-9 bg-[#00E4C3] text-[#002B3C] rounded-full flex items-center justify-center font-bold text-xs">PLIN</div>
                <span className="text-sm font-bold text-white">{config.plinNumber}</span>
              </button>
            </div>
            <p className="text-center text-xs text-yellow-500">{config.accountHolder}</p>

            <div className="space-y-4">
              <Input label="Número de Operación / Referencia" placeholder="Ej. 12345678" value={formData.operationNumber} onChange={(e) => setFormData({...formData, operationNumber: e.target.value})} required />
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Captura de pantalla (Voucher) <span className="text-yellow-500">*</span></label>
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-[#1A202C] hover:bg-gray-800 transition-colors overflow-hidden">
                  {formData.fileUrl ? (
                    <div className="flex items-center gap-4 p-3 w-full">
                      <img src={formData.fileUrl} alt="Vista previa" className="w-24 h-24 object-cover rounded-lg border border-yellow-500/50" />
                      <div className="text-left flex-1">
                        <p className="text-sm text-green-400 font-bold">¡Comprobante cargado!</p>
                        <p className="text-xs text-gray-400 truncate max-w-[200px]">{formData.fileName}</p>
                        <span className="inline-block mt-2 text-xs text-yellow-500 underline">Cambiar imagen</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-yellow-500" />
                      <p className="mb-1 text-sm text-gray-300 font-semibold">Click para subir captura de pago</p>
                      <p className="text-xs text-gray-500">PNG, JPG (Máx. 5MB)</p>
                    </div>
                  )}
                  <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                </label>
              </div>
            </div>

            <Button className="w-full mt-6" onClick={() => setStep(2)} disabled={!formData.amount || !formData.operationNumber || !formData.fileUrl || estTickets < 1}>
              Continuar <ChevronRight size={20} />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/3">
                <label className="block text-sm text-gray-400 mb-2">Tipo Doc</label>
                <select className="w-full bg-[#0A0D14] border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-500 h-[50px]" value={formData.docType} onChange={(e) => setFormData({...formData, docType: e.target.value})}>
                  <option>DNI</option>
                  <option>CE</option>
                </select>
              </div>
              <div className="w-2/3">
                <Input label="Número de Documento" placeholder="Ingresa tu número" value={formData.document} onChange={(e) => setFormData({...formData, document: e.target.value})} required />
              </div>
            </div>
             
            <div className="grid grid-cols-2 gap-4">
              <Input label="Nombres" placeholder="Ej. Juan" value={formData.names} onChange={(e) => setFormData({...formData, names: e.target.value})} required />
              <Input label="Apellidos" placeholder="Ej. Pérez" value={formData.surnames} onChange={(e) => setFormData({...formData, surnames: e.target.value})} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Celular (WhatsApp)" type="tel" placeholder="987654321" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
              <div>
                <label className="block text-sm text-gray-400 mb-2">Departamento</label>
                <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full bg-[#0A0D14] border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-500" />
              </div>
            </div>
             
            <label className="flex items-start gap-3 mt-4 p-4 bg-[#1A202C] rounded-xl border border-gray-700 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded bg-black border-gray-600 text-yellow-500" checked={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.checked})} />
              <span className="text-sm text-gray-300 leading-tight">Declaro que la información y el comprobante son verdaderos y acepto las bases del sorteo pro-fondos.</span>
            </label>

            <div className="flex gap-4 mt-8">
              <Button variant="secondary" className="w-1/3" onClick={() => setStep(1)}>Atrás</Button>
              <Button className="w-2/3" onClick={() => setStep(3)} disabled={!formData.document || !formData.names || !formData.phone || !formData.terms}>
                Revisar Datos <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#1A202C] to-[#12161C] rounded-xl p-5 border border-red-900/50 shadow-lg">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-yellow-500" /> Resumen de tu Registro</h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Participante:</span>
                  <span className="text-white font-medium text-right">{formData.names} {formData.surnames} <br/> {formData.docType} {formData.document}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">WhatsApp:</span>
                  <span className="text-white font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Pago reportado:</span>
                  <span className="text-green-400 font-bold">S/ {Number(formData.amount).toFixed(2)} ({formData.paymentMethod.toUpperCase()})</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">N° Operación:</span>
                  <span className="text-white font-mono">{formData.operationNumber}</span>
                </div>
                <div className="flex justify-between pt-2 items-center">
                  <span className="text-gray-400 font-bold">Tickets solicitados:</span>
                  <div className="bg-yellow-500 text-black px-3 py-1 rounded font-black text-lg">{estTickets}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3">
              <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
              <p className="text-xs text-blue-200 leading-relaxed">
                Tus tickets oficiales se emitirán una vez que Tesorería valide el comprobante. Guarda tu N° de Documento para consultar y descargar tus tickets.
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Button variant="secondary" className="w-1/3" onClick={() => setStep(2)} disabled={isSubmitting}>Atrás</Button>
              <Button className="w-2/3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Confirmar y Enviar'}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#12161C] w-full h-full md:h-auto md:max-w-xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-800">
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#080A0C]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Ticket className="text-yellow-500" /> Reclamar Tickets
          </h3>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {!success && (
          <div className="bg-[#1A202C] h-1.5 w-full">
            <div className="h-full bg-red-700 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        )}

        <div className="p-6 overflow-y-auto flex-1">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center py-8 h-full">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">¡Solicitud Recibida!</h3>
              <span className="text-xs font-mono bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full border border-yellow-500/30 mb-4">
                Código: {createdSolicitudeId} — Pendiente de Validación
              </span>
              <p className="text-gray-400 mb-6 max-w-sm text-sm">
                Estamos verificando tu comprobante con Tesorería. Una vez validado, tus tickets aparecerán en la sección Consultar.
              </p>
              <div className="bg-[#1A202C] p-4 rounded-xl border border-gray-700 w-full mb-6">
                <p className="text-xs text-gray-400 mb-1">Consulta el estado con tu Documento:</p>
                <p className="text-xl font-bold text-white tracking-widest">{formData.document}</p>
              </div>
              <Button onClick={handleClose} className="w-full">Entendido, Volver al inicio</Button>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </div>
    </div>
  );
};

const QrModal = () => {
  const { config, isQrModalOpen, setIsQrModalOpen } = useContext(AppContext);
  if (!isQrModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#12161C] border border-gray-800 rounded-2xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2"><QrCode className="text-yellow-500" /> Códigos QR Oficiales</h3>
          <button onClick={() => setIsQrModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X size={20} /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div className="bg-[#080A0C] p-4 rounded-xl border border-purple-900/50">
            <span className="inline-block bg-[#742284] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">YAPE</span>
            <img src={config.yapeQr} alt="QR Yape" className="w-44 h-44 mx-auto rounded-lg bg-white p-2 mb-3 object-contain" />
            <p className="text-white font-bold">{config.yapeNumber}</p>
          </div>
          <div className="bg-[#080A0C] p-4 rounded-xl border border-cyan-900/50">
            <span className="inline-block bg-[#00E4C3] text-black text-xs font-bold px-3 py-1 rounded-full mb-3">PLIN</span>
            <img src={config.plinQr} alt="QR Plin" className="w-44 h-44 mx-auto rounded-lg bg-white p-2 mb-3 object-contain" />
            <p className="text-white font-bold">{config.plinNumber}</p>
          </div>
        </div>
        <p className="text-center text-xs text-yellow-500 mt-4">{config.accountHolder}</p>
      </div>
    </div>
  );
};

const LegalModal = () => {
  const { config, legalModalType, setLegalModalType } = useContext(AppContext);
  if (!legalModalType) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#12161C] border border-gray-800 rounded-2xl max-w-xl w-full p-6">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-white uppercase">Bases y Términos del Sorteo</h3>
          <button onClick={() => setLegalModalType(null)} className="text-gray-400 hover:text-white cursor-pointer"><X size={20} /></button>
        </div>
        <div className="text-sm text-gray-300 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          <p><strong>1. Organizador:</strong> {config.brandName} {config.brandSubtitle}, actividad pro-fondos para la renovación de vestuarios e indumentaria tradicional.</p>
          <p><strong>2. Valor del Ticket:</strong> Cada ticket tiene un costo único de S/ {Number(config.ticketPrice).toFixed(2)} Soles.</p>
          <p><strong>3. Validación de Pagos:</strong> Toda participación pasa por verificación manual de Tesorería contrastando el número de operación y el abono real en cuenta antes de emitir los códigos definitivos.</p>
          <p><strong>4. Regla de Desempate:</strong> {config.tieBreakerRule}</p>
          <p><strong>5. Fecha del Sorteo:</strong> El sorteo se transmitirá en vivo el {new Date(config.drawDate).toLocaleString('es-PE')}.</p>
        </div>
        <Button className="w-full mt-6" onClick={() => setLegalModalType(null)}>Entendido</Button>
      </div>
    </div>
  );
};

const AdminLoginModal = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, setIsAdminAuthenticated, setIsAdminView } = useContext(AppContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin2026' || password === 'paucarbambilla2026') {
      setIsAdminAuthenticated(true);
      setIsLoginModalOpen(false);
      setIsAdminView(true);
      setPassword('');
      setError('');
    } else {
      setError('Contraseña incorrecta. Usa: admin2026');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-[#12161C] border border-red-900/50 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock size={18} className="text-yellow-500" /> Acceso Tesorería
          </h3>
          <button onClick={() => setIsLoginModalOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-400 mb-4">Ingresa la clave administrativa para gestionar pagos, premios y tickets.</p>
        <form onSubmit={handleLogin}>
          <Input
            label="Contraseña Administrativa"
            type="password"
            placeholder="Ingresa tu clave..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
          />
          <Button type="submit" className="w-full mt-2">Ingresar al Panel</Button>
        </form>
      </div>
    </div>
  );
};

const Footer = () => {
  const { config, openAdminAccess, setLegalModalType } = useContext(AppContext);
  return (
    <footer className="bg-black pt-16 pb-24 md:pb-8 border-t border-red-900/50 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <img src={config.logo} alt="Logo" referrerPolicy="no-referrer" className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(245,197,66,0.2)]" />
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none">
                {config.brandName} <br/><span className="text-yellow-500 text-sm md:text-lg">{config.brandSubtitle}</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Plataforma oficial del Gran Sorteo Pro-Fondos. Transparencia, seguridad y tradición huanuqueña. ¡Gracias por tu apoyo!
            </p>
            <div className="flex gap-4">
              <a href={config.socialLinks.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#1A202C] rounded-full flex items-center justify-center border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer text-gray-400 hover:text-yellow-500">FB</a>
              <a href={config.socialLinks.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#1A202C] rounded-full flex items-center justify-center border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer text-gray-400 hover:text-yellow-500">IG</a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#premios" className="hover:text-yellow-400 transition-colors">Ver Premios</a></li>
              <li><a href="#pasos" className="hover:text-yellow-400 transition-colors">Cómo Participar</a></li>
              <li><a href="#consultar" className="hover:text-yellow-400 transition-colors">Consultar Tickets</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Ayuda</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#faq" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><button onClick={() => setLegalModalType('terms')} className="hover:text-white transition-colors cursor-pointer">Términos y Condiciones</button></li>
              <li><a href={`https://wa.me/51${config.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-yellow-500 flex items-center gap-1">Soporte WhatsApp ({config.whatsapp})</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados.</p>
          <button onClick={openAdminAccess} className="flex items-center gap-1 hover:text-gray-400 transition-colors cursor-pointer">
            <Lock size={12} /> Tesorería Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

const BottomNav = () => {
  const { setIsRegisterModalOpen } = useContext(AppContext);
  const items = [
    { icon: Home, label: 'Inicio', href: '#' },
    { icon: Gift, label: 'Premios', href: '#premios' },
    { icon: Ticket, label: 'Participar', action: () => setIsRegisterModalOpen(true), highlight: true },
    { icon: Search, label: 'Tickets', href: '#consultar' },
    { icon: HelpCircle, label: 'Ayuda', href: '#faq' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0D14]/95 backdrop-blur-lg border-t border-gray-800 z-40 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item, idx) => (
          item.action ? (
            <button key={idx} onClick={item.action} className="flex flex-col items-center justify-center w-full h-full relative -top-4 cursor-pointer">
              <div className="bg-gradient-to-tr from-red-700 to-red-900 p-3 rounded-full shadow-[0_0_15px_rgba(139,0,0,0.6)] text-white border border-red-500/50">
                <item.icon size={24} />
              </div>
              <span className="text-[10px] font-bold mt-1 text-red-500">{item.label}</span>
            </button>
          ) : (
            <a key={idx} href={item.href} className="flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-yellow-500 transition-colors">
              <item.icon size={20} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </a>
          )
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const {
    config, saveConfigToCloud,
    setIsAdminView, setIsAdminAuthenticated,
    firebaseConnected,
    applications, approveApplication, rejectApplication,
    verifiedTickets,
    winners, publishWinner,
    auditLogs
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('requests');
  const [filterStatus, setFilterStatus] = useState('all');
  const [previewVoucher, setPreviewVoucher] = useState(null);
  const [rejectModalAppId, setRejectModalAppId] = useState(null);
  const [rejectReasonText, setRejectReasonText] = useState('El número de operación no figura en el estado de cuenta.');
  const [editConfig, setEditConfig] = useState(config);
  const [saveMessage, setSaveMessage] = useState('');

  const [winnerForm, setWinnerForm] = useState({
    prizeName: config.prizes[0]?.name || '',
    ticketCode: '',
    winnerName: '',
    videoUrl: ''
  });

  useEffect(() => {
    setEditConfig(config);
  }, [config]);

  const pendingApps = applications.filter(a => a.status === 'pending');
  const approvedApps = applications.filter(a => a.status === 'approved');
  const revenue = approvedApps.reduce((acc, curr) => acc + Number(curr.totalAmount || 0), 0);

  // Detector de números de operación repetidos
  const operationCounts = {};
  applications.forEach(a => {
    const op = (a.operationNumber || '').trim();
    if (op) operationCounts[op] = (operationCounts[op] || 0) + 1;
  });

  const filteredApps = applications
    .filter(a => filterStatus === 'all' ? true : a.status === filterStatus)
    .sort((a, b) => (a.status === 'pending' ? -1 : 1));

  const handleExportCSV = () => {
    const headers = ['Codigo_Ticket', 'Solicitud', 'DNI', 'Participante', 'Celular', 'Campaña', 'Fecha'];
    const rows = verifiedTickets.map(t => [
      t.code,
      t.appId,
      t.document,
      `"${t.fullName || t.alias}"`,
      t.phone || '',
      `"${t.campaign || config.campaignName}"`,
      t.date
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tickets_sorteo_paucarbambilla_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveConfig = async (e) => {
    e.preventDefault();
    await saveConfigToCloud({
      ...editConfig,
      ticketPrice: Number(editConfig.ticketPrice) || 15
    });
    setSaveMessage('¡Configuración actualizada y sincronizada!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleLookupWinnerTicket = (code) => {
    setWinnerForm(prev => ({ ...prev, ticketCode: code }));
    const found = verifiedTickets.find(t => (t.code || '').toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setWinnerForm(prev => ({ ...prev, ticketCode: code, winnerName: found.fullName || found.alias }));
    }
  };

  const handlePublishWinner = async (e) => {
    e.preventDefault();
    if (!winnerForm.ticketCode || !winnerForm.winnerName) return;
    await publishWinner(winnerForm);
    setWinnerForm({ prizeName: config.prizes[0]?.name || '', ticketCode: '', winnerName: '', videoUrl: '' });
  };

  return (
    <div className="min-h-screen bg-[#080A0C] text-white flex flex-col">
      {/* Barra de estado de conexión Firebase */}
      <div className={`px-6 py-2 text-xs font-bold flex items-center justify-between ${firebaseConnected ? 'bg-green-900/40 text-green-300 border-b border-green-500/30' : 'bg-yellow-900/40 text-yellow-300 border-b border-yellow-500/30'}`}>
        <span>
          {firebaseConnected
            ? `🟢 Conectado a Firebase Firestore en Tiempo Real: Proyecto ${FIREBASE_CONFIG.projectId} sincronizado en la nube.`
            : `🟡 Conectando a Firebase Firestore (${FIREBASE_CONFIG.projectId})...`}
        </span>
        <span className="font-mono">Clave activa: admin2026</span>
      </div>

      {/* Topbar */}
      <header className="bg-[#12161C] border-b border-red-900/50 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-red-900 p-2 rounded-lg"><LayoutDashboard size={20} className="text-white" /></div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Panel Administrativo de Tesorería</h1>
            <p className="text-[10px] text-gray-400">{config.brandName} {config.brandSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="text-sm py-2" onClick={() => setIsAdminView(false)}>
            Ver Web Pública
          </Button>
          <Button variant="danger" className="text-sm py-2" onClick={() => { setIsAdminAuthenticated(false); setIsAdminView(false); }}>
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Sidebar con las 5 herramientas */}
        <aside className="w-full md:w-64 bg-[#12161C] border-b md:border-b-0 md:border-r border-gray-800 shrink-0">
          <nav className="p-4 flex md:flex-col gap-2 overflow-x-auto">
            <button onClick={() => setActiveTab('requests')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'requests' ? 'bg-red-900/20 text-yellow-400 border border-red-900/40' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Users size={18} /> 1. Revisar Pagos
              {pendingApps.length > 0 && <span className="ml-auto bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingApps.length}</span>}
            </button>
            <button onClick={() => setActiveTab('tickets')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'tickets' ? 'bg-red-900/20 text-yellow-400 border border-red-900/40' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Ticket size={18} /> 2. Tickets Emitidos
            </button>
            <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'settings' ? 'bg-red-900/20 text-yellow-400 border border-red-900/40' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Settings size={18} /> 3. Configurar Campaña
            </button>
            <button onClick={() => setActiveTab('winners')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'winners' ? 'bg-red-900/20 text-yellow-400 border border-red-900/40' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Trophy size={18} /> 4. Publicar Ganadores
            </button>
            <button onClick={() => setActiveTab('audit')} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === 'audit' ? 'bg-red-900/20 text-yellow-400 border border-red-900/40' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Clock size={18} /> 5. Historial Auditoría
            </button>
          </nav>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#0A0D14]">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
            <Card className="p-4 border-t-4 border-t-yellow-500">
              <span className="text-xs text-gray-400 uppercase font-bold">Pendientes de Revisión</span>
              <p className="text-3xl font-black text-yellow-400 mt-1">{pendingApps.length}</p>
            </Card>
            <Card className="p-4 border-t-4 border-t-green-500">
              <span className="text-xs text-gray-400 uppercase font-bold">Recaudación Validada</span>
              <p className="text-3xl font-black text-green-400 mt-1">S/ {revenue.toFixed(2)}</p>
            </Card>
            <Card className="p-4 border-t-4 border-t-blue-500">
              <span className="text-xs text-gray-400 uppercase font-bold">Tickets Emitidos</span>
              <p className="text-3xl font-black text-white mt-1">{verifiedTickets.length}</p>
            </Card>
            <Card className="p-4 border-t-4 border-t-purple-500">
              <span className="text-xs text-gray-400 uppercase font-bold">Solicitudes Totales</span>
              <p className="text-3xl font-black text-white mt-1">{applications.length}</p>
            </Card>
          </div>

          {/* TAB 1: REVISAR PAGOS */}
          {activeTab === 'requests' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">Revisión de Transferencias (Vouchers)</h2>
                <div className="flex gap-2">
                  {['all', 'pending', 'approved', 'rejected'].map(st => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer ${filterStatus === st ? 'bg-yellow-500 text-black' : 'bg-[#12161C] text-gray-400 border border-gray-800'}`}
                    >
                      {st === 'all' ? 'Todas' : st === 'pending' ? 'Pendientes' : st === 'approved' ? 'Aprobadas' : 'Rechazadas'}
                    </button>
                  ))}
                </div>
              </div>
              
              {filteredApps.length === 0 ? (
                <div className="text-center py-20 bg-[#12161C] rounded-xl border border-gray-800 text-gray-500">
                  No hay solicitudes en este filtro.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApps.map(app => {
                    const isDuplicateOp = operationCounts[(app.operationNumber || '').trim()] > 1;
                    return (
                      <Card key={app.id} className={`p-4 flex flex-col lg:flex-row gap-6 border-l-4 ${
                        app.status === 'pending' ? 'border-l-yellow-500 bg-[#12161C]' : 
                        app.status === 'approved' ? 'border-l-green-500 bg-green-900/5' : 'border-l-red-500 bg-red-900/5'
                      }`}>
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                          <div className="col-span-2 md:col-span-1">
                            <p className="text-xs text-gray-500 mb-1">Comprobante</p>
                            {app.fileUrl ? (
                              <button onClick={() => setPreviewVoucher(app)} className="relative group block cursor-pointer">
                                <img src={app.fileUrl} alt="Voucher" className="w-20 h-20 object-cover rounded-lg border border-gray-700" />
                                <span className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] font-bold rounded-lg transition-opacity">
                                  <Eye size={14} className="mr-1" /> Ver
                                </span>
                              </button>
                            ) : (
                              <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                                SIN FOTO
                              </div>
                            )}
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-yellow-500">{app.id}</span>
                              {isDuplicateOp && (
                                <span className="bg-red-500/20 border border-red-500 text-red-400 text-[10px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                                  <AlertTriangle size={12} /> Posible N° Operación Duplicado
                                </span>
                              )}
                            </div>
                            <p className="font-bold text-base mt-0.5">{app.names} {app.surnames}</p>
                            <p className="text-xs text-gray-400">{app.docType}: {app.document} | {app.department || 'Huánuco'}</p>
                            <a href={`https://wa.me/51${app.phone}`} target="_blank" rel="noreferrer" className="text-xs text-green-400 hover:underline mt-1 inline-block">
                              WhatsApp: {app.phone}
                            </a>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Pago Reportado</p>
                            <p className="font-bold text-green-400 text-lg">S/ {Number(app.totalAmount).toFixed(2)}</p>
                            <span className="text-[10px] text-white uppercase bg-gray-800 px-2 py-0.5 rounded font-bold">{app.paymentMethod}</span>
                            <p className="text-xs font-mono text-gray-300 mt-1">Op: {app.operationNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Tickets a Emitir</p>
                            <p className="font-black text-3xl text-yellow-500">{app.estimatedTickets}</p>
                          </div>
                        </div>
                        
                        <div className="flex lg:flex-col justify-end gap-2 lg:border-l lg:border-gray-800 lg:pl-6 min-w-[160px]">
                          {app.status === 'pending' ? (
                            <>
                              <button onClick={() => approveApplication(app.id)} className="flex-1 lg:flex-none bg-green-600 hover:bg-green-500 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                <Check size={16} /> Aprobar y Emitir
                              </button>
                              <button onClick={() => setRejectModalAppId(app.id)} className="flex-1 lg:flex-none bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-900 px-4 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer">
                                <XCircle size={16} /> Rechazar
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                              <span className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider
                                ${app.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                                {app.status === 'approved' ? 'VALIDADO' : 'RECHAZADO'}
                              </span>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TICKETS EMITIDOS Y EXPORTACIÓN EXCEL */}
          {activeTab === 'tickets' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Padrón Oficial de Tickets Emitidos ({verifiedTickets.length})</h2>
                <Button onClick={handleExportCSV} className="text-xs py-2.5 px-4">
                  <Download size={16} /> Exportar Padrón a Excel (CSV)
                </Button>
              </div>
              <Card className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#080A0C] text-gray-400 text-xs uppercase border-b border-gray-800">
                    <tr>
                      <th className="py-3.5 px-4">Código Ticket</th>
                      <th className="py-3.5 px-4">Participante</th>
                      <th className="py-3.5 px-4">DNI / Doc</th>
                      <th className="py-3.5 px-4">Solicitud</th>
                      <th className="py-3.5 px-4">Fecha Emisión</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {verifiedTickets.map(t => (
                      <tr key={t.id} className="hover:bg-[#1A202C]">
                        <td className="py-3 px-4 font-mono font-bold text-yellow-400">{t.code}</td>
                        <td className="py-3 px-4 text-white">{t.fullName || t.alias}</td>
                        <td className="py-3 px-4 font-mono text-gray-300">{t.document}</td>
                        <td className="py-3 px-4 font-mono text-gray-400">{t.appId}</td>
                        <td className="py-3 px-4 text-gray-400 text-xs">{t.date ? new Date(t.date).toLocaleString() : ' Oficial'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {/* TAB 3: CONFIGURAR CAMPAÑA, PRECIOS Y PREMIOS */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Configuración General de la Campaña</h2>
              {saveMessage && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500 text-green-300 font-bold text-sm">
                  {saveMessage}
                </div>
              )}
              <form onSubmit={handleSaveConfig} className="space-y-6">
                <Card className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-yellow-500 border-b border-gray-800 pb-2">Datos de la Campaña y Fechas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Nombre de la Campaña" value={editConfig.campaignName} onChange={(e) => setEditConfig({...editConfig, campaignName: e.target.value})} />
                    <Input label="Precio por Ticket (S/)" type="number" value={editConfig.ticketPrice} onChange={(e) => setEditConfig({...editConfig, ticketPrice: e.target.value})} />
                    <Input label="Cierre de Participaciones (ISO)" value={editConfig.deadlineDate} onChange={(e) => setEditConfig({...editConfig, deadlineDate: e.target.value})} />
                    <Input label="Fecha del Sorteo (ISO)" value={editConfig.drawDate} onChange={(e) => setEditConfig({...editConfig, drawDate: e.target.value})} />
                  </div>
                </Card>

                <Card className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-yellow-500 border-b border-gray-800 pb-2">Cuentas Yape / Plin y Contacto</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Número de Yape" value={editConfig.yapeNumber} onChange={(e) => setEditConfig({...editConfig, yapeNumber: e.target.value})} />
                    <Input label="Número de Plin" value={editConfig.plinNumber} onChange={(e) => setEditConfig({...editConfig, plinNumber: e.target.value})} />
                    <Input label="Titular Receptor (Tesorero)" value={editConfig.accountHolder} onChange={(e) => setEditConfig({...editConfig, accountHolder: e.target.value})} />
                    <Input label="WhatsApp de Soporte" value={editConfig.whatsapp} onChange={(e) => setEditConfig({...editConfig, whatsapp: e.target.value})} />
                  </div>
                </Card>

                <Button type="submit" className="w-full py-4 text-lg">Guardar Cambios en Tiempo Real</Button>
              </form>
            </div>
          )}

          {/* TAB 4: PUBLICAR GANADORES */}
          {activeTab === 'winners' && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-yellow-500 mb-4">Registrar Ticket Ganador</h3>
                <form onSubmit={handlePublishWinner} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Premio Sorteado</label>
                    <select
                      value={winnerForm.prizeName}
                      onChange={(e) => setWinnerForm({...winnerForm, prizeName: e.target.value})}
                      className="w-full bg-[#0A0D14] border border-gray-700 rounded-xl py-3 px-4 text-white"
                    >
                      {config.prizes.map(p => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <Input
                    label="Código del Ticket Ganador (Ej. NJP-00101)"
                    placeholder="NJP-00101"
                    value={winnerForm.ticketCode}
                    onChange={(e) => handleLookupWinnerTicket(e.target.value)}
                    required
                  />
                  <Input
                    label="Nombre Público del Ganador"
                    placeholder="Se autocompleta si el ticket existe"
                    value={winnerForm.winnerName}
                    onChange={(e) => setWinnerForm({...winnerForm, winnerName: e.target.value})}
                    required
                  />
                  <Input
                    label="Enlace al Video del Sorteo (Opcional)"
                    placeholder="https://facebook.com/..."
                    value={winnerForm.videoUrl}
                    onChange={(e) => setWinnerForm({...winnerForm, videoUrl: e.target.value})}
                  />
                  <Button type="submit" className="w-full">Publicar Ganador Oficial</Button>
                </form>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-white mb-4">Ganadores Publicados ({winners.length})</h3>
                {winners.length === 0 ? (
                  <p className="text-sm text-gray-500">Aún no se han publicado ganadores.</p>
                ) : (
                  <div className="space-y-3">
                    {winners.map(w => (
                      <div key={w.id} className="p-3 rounded-xl bg-[#0A0D14] border border-gray-800">
                        <span className="text-xs font-bold text-yellow-500">{w.prizeName}</span>
                        <p className="font-mono font-bold text-white">{w.ticketCode} — {w.winnerName}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {/* TAB 5: AUDITORÍA */}
          {activeTab === 'audit' && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Historial de Acciones Administrativas</h2>
              <Card className="divide-y divide-gray-800">
                {auditLogs.map(log => (
                  <div key={log.id} className="p-4 flex justify-between items-center text-sm">
                    <div>
                      <span className="font-bold text-yellow-500">{log.action}</span>
                      <p className="text-gray-300 text-xs mt-0.5">{log.detail}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{log.admin}</p>
                      <p>{new Date(log.date).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Modal para Inspeccionar Foto del Comprobante */}
      {previewVoucher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#12161C] border border-gray-700 rounded-2xl max-w-lg w-full p-5">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-white">Comprobante de {previewVoucher.names} ({previewVoucher.id})</h4>
              <button onClick={() => setPreviewVoucher(null)} className="text-gray-400 hover:text-white cursor-pointer"><X size={20} /></button>
            </div>
            <img src={previewVoucher.fileUrl} alt="Voucher Grande" className="w-full max-h-[65vh] object-contain rounded-xl bg-black mb-4" />
            <div className="flex justify-between items-center text-xs text-gray-300 mb-4">
              <span>Monto: <strong className="text-green-400">S/ {Number(previewVoucher.totalAmount).toFixed(2)}</strong></span>
              <span>Operación: <strong className="font-mono text-yellow-400">{previewVoucher.operationNumber}</strong></span>
            </div>
            <Button variant="secondary" className="w-full" onClick={() => setPreviewVoucher(null)}>Cerrar Vista Previa</Button>
          </div>
        </div>
      )}

      {/* Modal para Indicar Motivo de Rechazo */}
      {rejectModalAppId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#12161C] border border-red-900 rounded-2xl max-w-md w-full p-6">
            <h4 className="font-bold text-white text-lg mb-2">Motivo del Rechazo ({rejectModalAppId})</h4>
            <p className="text-xs text-gray-400 mb-4">Este mensaje podrá ser visto por el participante al consultar su estado.</p>
            <textarea
              rows={3}
              value={rejectReasonText}
              onChange={(e) => setRejectReasonText(e.target.value)}
              className="w-full bg-[#0A0D14] border border-gray-700 rounded-xl p-3 text-white text-sm mb-4"
            />
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setRejectModalAppId(null)}>Cancelar</Button>
              <Button variant="danger" className="flex-1" onClick={() => { rejectApplication(rejectModalAppId, rejectReasonText); setRejectModalAppId(null); }}>
                Confirmar Rechazo
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PublicApp = () => {
  const { config } = useContext(AppContext);
  return (
    <div className="min-h-screen bg-[#080A0C] text-white font-sans selection:bg-red-900 selection:text-white">
      <Header />
      <main>
        <HeroCarousel />
        <Countdown targetDate={config.deadlineDate} />
        <LeaderboardSection />
        <StepsSection />
        <PrizesSection />
        <TicketCheckSection />
        <WinnersSection />
        <FAQSection />
      </main>
      <Footer />
      <BottomNav />
      <RegistrationModal />
      <QrModal />
      <LegalModal />
      <AdminLoginModal />
    </div>
  );
};

const AppContainer = () => {
  const { isAdminView } = useContext(AppContext);
  return isAdminView ? <AdminDashboard /> : <PublicApp />;
};

export default function App() {
  return (
    <AppProvider>
      <AppContainer />
    </AppProvider>
  );
}