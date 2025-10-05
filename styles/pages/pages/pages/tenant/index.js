import { useRouter } from 'next/router';
import Link from 'next/link';

export default function HomePage() {
  const { locale } = useRouter();
  const isAR = locale === 'ar';

  const propsEN = [
    { id: 1, name: "1BR — Al Reem Island", location: "Abu Dhabi", price: "AED 5,500/mo" },
    { id: 2, name: "Studio — Al Raha Beach", location: "Abu Dhabi", price: "AED 3,800/mo" }
  ];
  const propsAR = [
    { id: 1, name: "غرفة نوم واحدة — جزيرة الريم", location: "أبوظبي", price: "5,500 درهم / شهر" },
    { id: 2, name: "استوديو — شاطئ الراحة", location: "أبوظبي", price: "3,800 درهم / شهر" }
  ];
  const list = isAR ? propsAR : propsEN;

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-extrabold">
          {isAR ? "دفعات إيجار شهرية في الإمارات" : "Monthly rentals in the UAE"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isAR ? "ادفع شهريًا بدلًا من 4–6 شيكات." : "Pay monthly instead of 4–6 cheques."}
        </p>
      </header>

      {/* Listings preview */}
      <section className="grid md:grid-cols-2 gap-4">
        {list.map(item => (
          <div key={item.id} className="border rounded p-4 shadow-sm">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.location}</p>
            <p className="text-primary font-bold">{item.price}</p>
          </div>
        ))}
      </section>

      {/* For Agents block */}
      <section id="agents" className="mt-10 p-6 border rounded">
        <h2 className="text-2xl font-bold" style={{color:'#16543C'}}>
          {isAR ? "للوكلاء" : "For Agents"}
        </h2>
        <p className="mt-2">
          {isAR
            ? "أغلق المزيد من الصفقات بسرعة واحصل على عمولات."
            : "Close more deals, faster, and earn commissions."
          }
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>{isAR ? "عمولة: 1,200–2,000 درهم للصفقة" : "Commission: AED 1,200–2,000 per deal"}</li>
          <li>{isAR ? "لوحة وكيل + تكامل واتساب" : "Agent dashboard + WhatsApp integration"}</li>
          <li>{isAR ? "التدريب والدعم" : "Training and support"}</li>
        </ul>
        <div className="mt-4 space-x-3">
          <Link href="/agent" locale={locale} className="px-4 py-2 bg-primary text-white rounded">
            {isAR ? "دخول الوكيل" : "Agent sign‑in"}
          </Link>
          <a
            href="https://wa.me/971000000000?text=Hi%20BaySulu!%20I%20want%20to%20join%20as%20an%20Agent."
            target="_blank" rel="noreferrer"
            className="px-4 py-2 border rounded"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
import { useRouter } from 'next/router';

export default function TenantDashboard() {
  const isAR = useRouter().locale === 'ar';
  const name = "Tenant — John Doe";
  const active = 1;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isAR ? "لوحة المستأجر" : "Tenant Dashboard"}
      </h1>
      <p>{isAR ? "الاسم" : "Name"}: {name}</p>
      <p>{isAR ? "الإيجارات النشطة" : "Active rentals"}: {active}</p>
    </main>
  );
}
