import React, { useState, useEffect, createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { 
  Trophy, Clock, Upload, CheckCircle2, ChevronRight, ChevronLeft, 
  Menu, X, Search, ShieldCheck, CreditCard, Camera, Info, 
  ArrowRight, Home, Ticket, Gift, HelpCircle, Lock, LayoutDashboard,
  Users, Check, XCircle, FileImage, Download, Star
} from 'lucide-react';

// ==========================================
// CONFIGURACIÓN DE FIREBASE (Para VS Code)
// Reemplaza esto con los datos de tu proyecto de Firebase
// ==========================================
let firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// Adaptación para el entorno inmersivo colaborativo (Ignorar en VS Code)
if (typeof __firebase_config !== 'undefined') {
  firebaseConfig = JSON.parse(__firebase_config);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'paucarbambilla-bingo';

// ==========================================
// CONFIGURACIÓN GLOBAL POR DEFECTO
// ==========================================
const DEFAULT_CONFIG = {
  brandName: "CUADRILLA NIÑO JESÚS",
  brandSubtitle: "DE PAUCARBAMBILLA",
  logo: "https://i.imgur.com/2RISwHk.png",
  heroImage: "https://i.imgur.com/NwPwvhP.png",
  campaignName: "GRAN SORTEO PRO-FONDOS VESTUARIOS 2027",
  ticketPrice: 15.00, // En Soles
  deadlineDate: "2026-12-20T23:59:59",
  drawDate: "2026-12-25T15:00:00",
  yapeNumber: "987 654 321",
  plinNumber: "912 345 678",
  accountHolder: "Tesorero: Juan Pérez",
  whatsapp: "987654321",
  socialLinks: { facebook: "#", instagram: "#" },
  prizes: [
    { id: 1, name: "S/ 5,000 en Efectivo", category: "Premio Mayor", qty: 1, desc: "Premio mayor del sorteo.", image: "https://images.unsplash.com/photo-1580519542036-ed47c0ce31d7?auto=format&fit=crop&q=80&w=800", isMain: true },
    { id: 2, name: "Refrigeradora LG 2 Puertas", category: "Línea Blanca", qty: 1, desc: "Refrigeradora No Frost Inverter.", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800", isMain: false },
    { id: 3, name: "Smart TV Samsung 55\"", category: "Tecnología", qty: 2, desc: "Resolución 4K UHD.", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800", isMain: false },
    { id: 4, name: "Canasta de Víveres Premium", category: "Canasta", qty: 5, desc: "Valorizada en S/ 300 cada una.", image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80&w=800", isMain: false }
  ]
};

const MOCK_FAQ = [
  { q: "¿Cómo adquiero mi ticket para el sorteo?", a: "Transfiere el monto correspondiente por Yape o Plin, tómale captura y súbela en la sección 'Participar'. Te enviaremos tu ticket virtual tras validar el pago." },
  { q: "¿Cuánto cuesta cada ticket?", a: `El ticket tiene un valor de S/ ${DEFAULT_CONFIG.ticketPrice.toFixed(2)}. Todo lo recaudado será para los vestuarios de la Cuadrilla.` },
  { q: "¿Cuándo y dónde será el sorteo?", a: "El sorteo se realizará presencialmente y será transmitido en vivo por nuestra página de Facebook en la fecha indicada en el contador." },
  { q: "¿Cómo sé si mis tickets son válidos?", a: "Puedes usar la sección 'Consultar' ingresando tu número de DNI para descargar tus tickets aprobados." }
];

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // Datos de Firebase
  const [applications, setApplications] = useState([]);
  const [verifiedTickets, setVerifiedTickets] = useState([]);

  // 1. Efecto de Autenticación
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Auth init error:", error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // 2. Efecto para escuchar datos públicos de Firebase
  useEffect(() => {
    if (!user) return;

    // Escuchar Solicitudes
    const appsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'applications');
    const unsubApps = onSnapshot(appsRef, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(appsData);
    }, (error) => console.error("Error fetching apps:", error));

    // Escuchar Tickets/Cartones aprobados
    const ticketsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'tickets');
    const unsubTickets = onSnapshot(ticketsRef, (snapshot) => {
      const ticketsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVerifiedTickets(ticketsData);
    }, (error) => console.error("Error fetching tickets:", error));

    return () => {
      unsubApps();
      unsubTickets();
    };
  }, [user]);

  const addApplication = async (appData) => {
    if (!user) return;
    try {
      const appsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'applications');
      await addDoc(appsRef, {
        ...appData,
        status: 'pending',
        date: new Date().toISOString(),
        userId: user.uid
      });
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
    }
  };

  const approveApplication = async (appId) => {
    if (!user) return;
    try {
      const appRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'applications', appId);
      await updateDoc(appRef, { status: 'approved' });
      
      // Encontrar la solicitud para generar los tickets correspondientes
      const appData = applications.find(a => a.id === appId);
      if (appData) {
        const ticketsRef = collection(db, 'artifacts', APP_ID, 'public', 'data', 'tickets');
        const ticketsToGenerate = appData.estimatedTickets;
        
        // Generar N tickets
        for (let i = 0; i < ticketsToGenerate; i++) {
          await addDoc(ticketsRef, {
            appId: appId,
            document: appData.document,
            alias: appData.names.split(' ')[0] + ' ' + (appData.surnames.charAt(0) || '') + '.',
            campaign: config.campaignName,
            date: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      console.error("Error aprobando:", error);
    }
  };

  const rejectApplication = async (appId) => {
    if (!user) return;
    try {
      const appRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'applications', appId);
      await updateDoc(appRef, { status: 'rejected' });
    } catch (error) {
      console.error("Error rechazando:", error);
    }
  };

  return (
    <AppContext.Provider value={{
      config, setConfig,
      isAdminView, setIsAdminView,
      isRegisterModalOpen, setIsRegisterModalOpen,
      applications, addApplication, approveApplication, rejectApplication,
      verifiedTickets
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
  const baseStyle = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
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
          {isFinished ? "¡EL SORTEO HA COMENZADO!" : "Cierre de Venta de Tickets en:"}
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
      </div>
    </div>
  );
};

const Header = () => {
  const { config, setIsAdminView } = useContext(AppContext);
  return (
    <header className="sticky top-0 z-40 bg-[#080A0C]/95 backdrop-blur-md border-b border-red-900/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <img src={config.logo} alt="Logo" className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(245,197,66,0.3)]" />
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
          <button onDoubleClick={() => setIsAdminView(true)} className="text-xs text-red-900 hover:text-red-700 transition-colors flex items-center gap-1">
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
    <section className="relative w-full overflow-hidden bg-black h-[60vh] md:h-[75vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A0C] via-[#080A0C]/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0C] via-transparent to-[#080A0C]/50 z-10" />
        <img 
          src={config.heroImage} 
          alt="Niño Jesús de Paucarbambilla" 
          className="w-full h-full object-cover object-top opacity-50 scale-105"
        />
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
              <Ticket size={24} /> COMPRAR TICKETS
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

const StepsSection = () => {
  const steps = [
    { num: 1, title: "Realiza el Pago", desc: "Usa Yape o Plin a los números oficiales de tesorería.", icon: CreditCard },
    { num: 2, title: "Guarda Captura", desc: "Asegúrate que se vea fecha, monto y número de operación.", icon: Camera },
    { num: 3, title: "Sube tu Voucher", desc: "Adjunta la imagen aquí en nuestro sistema.", icon: Upload },
    { num: 4, title: "Recibe tu Ticket", desc: "Una vez validado, podrás descargar tu ticket virtual.", icon: CheckCircle2 }
  ];

  const { setIsRegisterModalOpen } = useContext(AppContext);

  return (
    <section id="pasos" className="py-16 md:py-24 bg-[#080A0C]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">SOLO <span className="text-yellow-500">4 PASOS</span> PARA PARTICIPAR</h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">Tu apoyo es importante. Compra tu ticket de forma rápida y 100% segura.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
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

const LeaderboardSection = () => {
  const { verifiedTickets } = useContext(AppContext);
  
  // Agrupar tickets por alias/documento
  const getTopPlayers = () => {
    const counts = {};
    verifiedTickets.forEach(ticket => {
      if(!counts[ticket.alias]) counts[ticket.alias] = 0;
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

const RegistrationModal = () => {
  const { config, isRegisterModalOpen, setIsRegisterModalOpen, addApplication } = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'yape',
    operationNumber: '',
    date: new Date().toISOString().split('T')[0],
    fileUrl: null, // Simulado para VS Code
    docType: 'DNI',
    document: '',
    names: '',
    surnames: '',
    phone: '',
    department: 'Huánuco',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isRegisterModalOpen) return null;

  const handleClose = () => {
    if(!isSubmitting) {
      setIsRegisterModalOpen(false);
      setTimeout(() => { setStep(1); setSuccess(false); setFormData({...formData, amount: '', operationNumber: '', document: '', names: '', surnames: '', phone: '', terms: false}); }, 300);
    }
  };

  const estTickets = Math.floor(Number(formData.amount || 0) / config.ticketPrice);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Calcular cuántos tickets le corresponden
    const exactAmount = Number(formData.amount);
    
    await addApplication({
      ...formData,
      estimatedTickets: estTickets,
      totalAmount: exactAmount
    });
    
    setIsSubmitting(false);
    setSuccess(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-[#1A202C] p-4 rounded-xl border border-red-900/30 mb-6">
              <p className="text-sm text-gray-400 mb-2">Precio por Ticket: <strong className="text-yellow-500">S/ {config.ticketPrice.toFixed(2)}</strong></p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input label="Monto transferido (S/)" type="number" placeholder={`Ej. ${config.ticketPrice * 2}`} value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                </div>
                <div className="flex-1 bg-black/50 rounded-xl p-3 border border-gray-800 text-center">
                  <span className="block text-xs text-gray-500 mb-1">Recibirás</span>
                  <span className="text-2xl font-black text-white">{estTickets} <span className="text-sm text-gray-500">Tickets</span></span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <button 
                onClick={() => setFormData({...formData, paymentMethod: 'yape'})}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'yape' ? 'border-[#742284] bg-[#742284]/10' : 'border-gray-700 bg-[#12161C] hover:border-gray-500'}`}
              >
                <div className="w-10 h-10 bg-[#742284] text-white rounded-full flex items-center justify-center font-bold text-xs">YAPE</div>
                <span className="text-sm font-bold text-white">{config.yapeNumber}</span>
              </button>
              <button 
                onClick={() => setFormData({...formData, paymentMethod: 'plin'})}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.paymentMethod === 'plin' ? 'border-[#00E4C3] bg-[#00E4C3]/10' : 'border-gray-700 bg-[#12161C] hover:border-gray-500'}`}
              >
                <div className="w-10 h-10 bg-[#00E4C3] text-[#002B3C] rounded-full flex items-center justify-center font-bold text-xs">PLIN</div>
                <span className="text-sm font-bold text-white">{config.plinNumber}</span>
              </button>
            </div>
            <p className="text-center text-xs text-yellow-500">{config.accountHolder}</p>

            <div className="space-y-4 mt-6">
              <Input label="Número de Operación / Referencia" placeholder="Ej. 12345678" value={formData.operationNumber} onChange={(e) => setFormData({...formData, operationNumber: e.target.value})} />
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Captura de pantalla (Voucher)</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer bg-[#1A202C] hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-yellow-500" />
                    <p className="mb-2 text-sm text-gray-300 font-semibold">{formData.fileUrl ? 'Voucher adjuntado ✓' : 'Click para subir imagen'}</p>
                    <p className="text-xs text-gray-500">PNG, JPG (Max 5MB)</p>
                  </div>
                  {/* SIMULACIÓN: En un entorno real aquí usarías Firebase Storage */}
                  <input type="file" className="hidden" onChange={(e) => setFormData({...formData, fileUrl: 'simulado.jpg'})} accept="image/*" />
                </label>
              </div>
            </div>

            <Button className="w-full mt-8" onClick={() => setStep(2)} disabled={!formData.amount || !formData.operationNumber || !formData.fileUrl || estTickets < 1}>
              Continuar <ChevronRight size={20} />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
             <div className="flex gap-4">
               <div className="w-1/3">
                 <label className="block text-sm text-gray-400 mb-2">Tipo Doc</label>
                 <select className="w-full bg-[#0A0D14] border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-yellow-500 h-[50px]" value={formData.docType} onChange={(e) => setFormData({...formData, docType: e.target.value})}>
                   <option>DNI</option>
                   <option>CE</option>
                 </select>
               </div>
               <div className="w-2/3">
                 <Input label="Número de Documento" placeholder="Ingresa tu número" value={formData.document} onChange={(e) => setFormData({...formData, document: e.target.value})} />
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <Input label="Nombres" placeholder="Ej. Juan" value={formData.names} onChange={(e) => setFormData({...formData, names: e.target.value})} />
               <Input label="Apellidos" placeholder="Ej. Pérez" value={formData.surnames} onChange={(e) => setFormData({...formData, surnames: e.target.value})} />
             </div>

             <Input label="Celular (WhatsApp)" type="tel" placeholder="987654321" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
             
             <label className="flex items-start gap-3 mt-6 p-4 bg-[#1A202C] rounded-xl border border-gray-700 cursor-pointer">
               <input type="checkbox" className="mt-1 w-4 h-4 rounded bg-black border-gray-600 text-yellow-500 focus:ring-yellow-500 focus:ring-offset-gray-900" checked={formData.terms} onChange={(e) => setFormData({...formData, terms: e.target.checked})} />
               <span className="text-sm text-gray-300 leading-tight">Declaro que la información es verdadera y acepto las bases del sorteo pro-fondos.</span>
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
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-gradient-to-br from-[#1A202C] to-[#12161C] rounded-xl p-5 border border-red-900/50 shadow-lg">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2"><ShieldCheck size={18} className="text-yellow-500" /> Resumen de tu Compra</h4>
              
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
                  <span className="text-gray-400 font-bold">Tickets a recibir:</span>
                  <div className="bg-yellow-500 text-black px-3 py-1 rounded font-black text-lg">{estTickets}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3">
              <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
              <p className="text-xs text-blue-200 leading-relaxed">
                Tus tickets se emitirán formalmente una vez que el tesorero valide la recepción del pago en nuestra cuenta. Guarda tu N° de Documento para consultar el estado.
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
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#12161C] w-full h-full md:h-auto md:max-w-xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-800">
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-[#080A0C]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Ticket className="text-yellow-500" /> Compra de Tickets
          </h3>
          <button onClick={handleClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        {!success && (
          <div className="bg-[#1A202C] h-1.5 w-full">
            <div className="h-full bg-red-700 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {success ? (
              <div className="flex flex-col items-center justify-center text-center py-10 h-full animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">¡Solicitud Recibida!</h3>
                <p className="text-gray-400 mb-8 max-w-sm">
                  Estamos verificando tu pago con Tesorería. Si todo está correcto, tus tickets se generarán automáticamente.
                </p>
                <div className="bg-[#1A202C] p-4 rounded-xl border border-gray-700 w-full mb-8">
                  <p className="text-sm text-gray-400 mb-1">Para descargar tus tickets usa tu DNI:</p>
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
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">Increíbles premios en nuestro Gran Apagón y jugadas extras.</p>

        {/* Main Prize Highlight */}
        {mainPrize && (
          <Card className="mb-12 border-red-900/50 bg-gradient-to-br from-[#12161C] to-[#1a1212] relative group shadow-[0_0_30px_rgba(139,0,0,0.15)]">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black font-black text-xs px-4 py-2 rounded-bl-xl z-10 uppercase tracking-widest shadow-lg">
              {mainPrize.category}
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-3/5 h-64 md:h-[400px] relative overflow-hidden">
                <img src={mainPrize.image} alt={mainPrize.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a1212] via-[#1a1212]/50 to-transparent" />
              </div>
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative z-10 -ml-0 md:-ml-10">
                <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{mainPrize.name}</h3>
                <p className="text-gray-300 mb-8 text-lg bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-gray-800">{mainPrize.desc}</p>
                <Button onClick={() => setIsRegisterModalOpen(true)} className="w-full md:w-auto self-start bg-red-700 hover:bg-red-600 text-white border-none shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                  Comprar Tickets
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Secondary Prizes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryPrizes.map(prize => (
            <Card key={prize.id} className="flex flex-col group hover:-translate-y-2 transition-transform duration-300 border-gray-800">
              <div className="h-48 relative overflow-hidden">
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
  const { applications, verifiedTickets } = useContext(AppContext);
  const [docToSearch, setDocToSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if(!docToSearch) return;
    
    // Buscar en datos cargados desde Firebase
    const userApps = applications.filter(a => a.document === docToSearch);
    const userTickets = verifiedTickets.filter(t => t.document === docToSearch);
    
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
          <p className="text-gray-400">Ingresa tu número de DNI para consultar el estado de tu pago y obtener tus tickets virtuales para el día del evento.</p>
        </div>

        <Card className="p-6 md:p-10 mb-8 border-gray-800">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><Search size={20} /></div>
              <input 
                type="text" 
                placeholder="Ingresa tu N° de Documento" 
                className="w-full bg-[#080A0C] border border-gray-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 text-lg transition-all"
                value={docToSearch}
                onChange={(e) => setDocToSearch(e.target.value)}
              />
            </div>
            <Button type="submit" className="md:w-auto py-4 px-8 text-lg shrink-0">
              Consultar
            </Button>
          </form>
        </Card>

        {hasSearched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {searchResult.apps.length > 0 ? (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#12161C] p-4 rounded-xl border border-gray-800 text-center">
                    <span className="block text-gray-500 text-xs uppercase mb-1">Solicitudes</span>
                    <span className="text-2xl font-bold text-white">{searchResult.apps.length}</span>
                  </div>
                  <div className="bg-[#12161C] p-4 rounded-xl border border-green-900/50 text-center bg-green-500/5">
                    <span className="block text-gray-400 text-xs uppercase mb-1">Tickets Aprobados</span>
                    <span className="text-2xl font-black text-green-400">{searchResult.totalApproved}</span>
                  </div>
                </div>

                {/* Status List */}
                <h4 className="text-white font-bold mb-4 mt-8">Historial de Solicitudes</h4>
                {searchResult.apps.map(app => (
                  <div key={app.id} className="bg-[#1A202C] border border-gray-700 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-gray-400">Ref: {app.id.substring(0,8)}...</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider
                          ${app.status === 'approved' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                            app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 
                            'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                          {app.status === 'approved' ? 'Validado' : app.status === 'pending' ? 'En Revisión' : 'Rechazado'}
                        </span>
                      </div>
                      <p className="text-white font-medium text-sm">Pago reportado: S/ {app.totalAmount.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">Fecha: {new Date(app.date).toLocaleDateString()}</p>
                    </div>
                    {app.status === 'approved' && (
                       <Button className="text-sm py-2 px-6 whitespace-nowrap bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20 border-none">
                         <Download size={16} /> Descargar Tickets
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
                <p className="text-gray-400 max-w-md mx-auto">Verifica que el número ingresado sea correcto. Si acabas de realizar el pago, asegúrate de haber enviado tu solicitud en la sección "Participar".</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-20 bg-[#080A0C]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-black text-center text-white mb-12 uppercase">Preguntas <span className="text-yellow-500">Frecuentes</span></h2>
        
        <div className="space-y-4">
          {MOCK_FAQ.map((faq, idx) => (
            <div key={idx} className="border border-gray-800 rounded-xl overflow-hidden bg-[#12161C]">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-[#1A202C] transition-colors"
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

const Footer = () => {
  const { config, setIsAdminView } = useContext(AppContext);
  return (
    <footer className="bg-black pt-16 pb-24 md:pb-8 border-t border-red-900/50 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <img src={config.logo} alt="Logo" className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(245,197,66,0.2)]" />
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none">
                {config.brandName} <br/><span className="text-yellow-500 text-sm md:text-lg">{config.brandSubtitle}</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Plataforma oficial del Gran Sorteo Pro-Fondos. Transparencia, seguridad y tradición huanuqueña. ¡Gracias por tu apoyo!
            </p>
            <div className="flex gap-4">
               <div className="w-10 h-10 bg-[#1A202C] rounded-full flex items-center justify-center border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer text-gray-400 hover:text-yellow-500">FB</div>
               <div className="w-10 h-10 bg-[#1A202C] rounded-full flex items-center justify-center border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer text-gray-400 hover:text-yellow-500">IG</div>
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
              <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors text-yellow-500 flex items-center gap-1">Soporte WhatsApp</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados.</p>
          <button onClick={() => setIsAdminView(true)} className="flex items-center gap-1 hover:text-gray-400 transition-colors">
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
    { icon: Ticket, label: 'Comprar', action: () => setIsRegisterModalOpen(true), highlight: true },
    { icon: Search, label: 'Cartones', href: '#consultar' },
    { icon: HelpCircle, label: 'Ayuda', href: '#faq' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0D14]/95 backdrop-blur-lg border-t border-gray-800 z-40 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {items.map((item, idx) => (
          item.action ? (
            <button key={idx} onClick={item.action} className="flex flex-col items-center justify-center w-full h-full relative -top-4">
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
  const { config, setIsAdminView, applications, approveApplication, rejectApplication, verifiedTickets } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('requests');

  const pendingApps = applications.filter(a => a.status === 'pending');
  const revenue = applications.filter(a => a.status === 'approved').reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="min-h-screen bg-[#080A0C] text-white flex flex-col">
      {/* Topbar */}
      <header className="bg-[#12161C] border-b border-red-900/50 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-red-900 p-2 rounded-lg"><LayoutDashboard size={20} className="text-white" /></div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Panel de Tesorería</h1>
            <p className="text-[10px] text-gray-400">Cuadrilla Niño Jesús de Paucarbambilla</p>
          </div>
        </div>
        <Button variant="secondary" className="text-sm py-2" onClick={() => setIsAdminView(false)}>
          Salir al público
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#12161C] border-r border-gray-800 hidden md:block">
          <nav className="p-4 space-y-2">
            <button onClick={() => setActiveTab('requests')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'requests' ? 'bg-red-900/20 text-red-500 border border-red-900/30' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Users size={18} /> Validar Pagos
              {pendingApps.length > 0 && <span className="ml-auto bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingApps.length}</span>}
            </button>
            <button onClick={() => setActiveTab('stats')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'stats' ? 'bg-red-900/20 text-red-500 border border-red-900/30' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Ticket size={18} /> Resumen de Ingresos
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#0A0D14]">
          {activeTab === 'requests' && (
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Revisión de Transferencias (Vouchers)</h2>
              
              {applications.length === 0 ? (
                <div className="text-center py-20 bg-[#12161C] rounded-xl border border-gray-800 text-gray-500">
                  No hay pagos registrados aún en Firebase.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Ordenar pendientes primero, luego el resto */}
                  {applications.slice().sort((a,b) => a.status === 'pending' ? -1 : 1).map(app => (
                    <Card key={app.id} className={`p-4 flex flex-col lg:flex-row gap-6 border-l-4 ${
                      app.status === 'pending' ? 'border-l-yellow-500 bg-[#12161C]' : 
                      app.status === 'approved' ? 'border-l-green-500 bg-green-900/5' : 'border-l-red-500 bg-red-900/5'
                    }`}>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                        <div className="col-span-2 md:col-span-1">
                          <p className="text-xs text-gray-500">Comprobante</p>
                          <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center text-gray-500 mt-1 text-xs">
                            IMG
                          </div>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-gray-500">Participante</p>
                          <p className="font-medium text-sm">{app.names} {app.surnames}</p>
                          <p className="text-xs text-gray-400">{app.docType}: {app.document}</p>
                          <p className="text-xs text-blue-400 mt-1">WA: {app.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Reporte</p>
                          <p className="font-bold text-green-400">S/ {app.totalAmount.toFixed(2)}</p>
                          <p className="text-[10px] text-gray-400 uppercase bg-gray-800 px-1 py-0.5 rounded inline-block mt-1">{app.paymentMethod}</p>
                          <p className="text-[10px] text-gray-500">Ref: {app.operationNumber}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Cartones</p>
                          <p className="font-black text-2xl text-yellow-500">{app.estimatedTickets}</p>
                        </div>
                      </div>
                      
                      <div className="flex lg:flex-col justify-end gap-2 lg:border-l lg:border-gray-800 lg:pl-6 min-w-[140px]">
                        {app.status === 'pending' ? (
                          <>
                            <button onClick={() => approveApplication(app.id)} className="flex-1 lg:flex-none bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                              <Check size={16} /> Aprobar
                            </button>
                            <button onClick={() => rejectApplication(app.id)} className="flex-1 lg:flex-none bg-red-900/50 hover:bg-red-800 text-red-200 border border-red-900 px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                              <XCircle size={16} /> Rechazar
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider
                              ${app.status === 'approved' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                              {app.status === 'approved' ? 'VALIDADO' : 'RECHAZADO'}
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="max-w-5xl mx-auto">
               <h2 className="text-2xl font-bold mb-6">Resumen de Recaudación</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card className="p-6 border-t-4 border-t-green-500 bg-gradient-to-b from-green-900/10 to-[#12161C]">
                   <h3 className="text-gray-400 text-sm font-bold uppercase mb-2">Total Recaudado (Validado)</h3>
                   <p className="text-4xl font-black text-white">S/ {revenue.toFixed(2)}</p>
                 </Card>
                 <Card className="p-6 border-t-4 border-t-yellow-500 bg-gradient-to-b from-yellow-900/10 to-[#12161C]">
                   <h3 className="text-gray-400 text-sm font-bold uppercase mb-2">Cartones Emitidos</h3>
                   <p className="text-4xl font-black text-white">{verifiedTickets.length}</p>
                 </Card>
                 <Card className="p-6 border-t-4 border-t-blue-500 bg-gradient-to-b from-blue-900/10 to-[#12161C]">
                   <h3 className="text-gray-400 text-sm font-bold uppercase mb-2">Solicitudes Totales</h3>
                   <p className="text-4xl font-black text-white">{applications.length}</p>
                 </Card>
               </div>
            </div>
          )}
        </main>
      </div>
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
        <FAQSection />
      </main>
      <Footer />
      <BottomNav />
      <RegistrationModal />
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