import { useRouter } from 'next/router';

export default function AgentDashboard() {
  const isAR = useRouter().locale === 'ar';
  const name = "Agent — Alex Lee";
  const myProps = 2;
  const estPerDeal = "AED 1,200–2,000";

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isAR ? "لوحة الوكيل" : "Agent Dashboard"}
      </h1>
      <p>{isAR ? "الاسم" : "Name"}: {name}</p>
      <p>{isAR ? "عقاراتي" : "My listings"}: {myProps}</p>
      <p>{isAR ? "عمولة تقديرية لكل صفقة" : "Est. commission per deal"}: {estPerDeal}</p>

      <section className="mt-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">
          {isAR ? "إضافة عقار (تجريبي)" : "Add Listing (demo)"}
        </h2>
        <p className="text-gray-600 text-sm">
          {isAR
            ? "هذا نموذج تجريبي بدون حفظ فعلي. النسخة الكاملة ستكون مع حساب وكيل."
            : "This is a demo form without actual saving. Full version will be with agent account."
          }
        </p>
        <div className="grid md:grid-cols-2 gap-3 mt-3">
          <input className="border p-2 rounded" placeholder={isAR ? "العنوان" : "Address"} />
          <input className="border p-2 rounded" placeholder={isAR ? "السعر (درهم)" : "Price (AED)"} />
        </div>
        <button className="mt-3 px-4 py-2 bg-primary text-white rounded">
          {isAR ? "إضافة" : "Add"}
        </button>
      </section>
    </main>
  );
}
