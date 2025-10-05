import { useRouter } from 'next/router';

export default function LandlordDashboard() {
  const isAR = useRouter().locale === 'ar';
  const name = "Landlord — Jane Smith";
  const listed = 3;
  const commission = "4–5% (~platform fee)";

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isAR ? "لوحة المؤجر" : "Landlord Dashboard"}
      </h1>
      <p>{isAR ? "الاسم" : "Name"}: {name}</p>
      <p>{isAR ? "العقارات المعروضة" : "Properties Listed"}: {listed}</p>
      <p>{isAR ? "العمولة التقريبية" : "Approx. commission"}: {commission}</p>
    </main>
  );
}
