import * as React from "react";


export default function PurchasesPage() {
  const [purchases, setPurchases] = React.useState([]);
  const [loading , setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("/api/purchases", {
      method: "GET",
    }).then(response => response.json()).then(data => {
      setPurchases(data);
      setLoading(false);
      
    })
   
  }, []);
  return (
    <>
      {/* title */}
      <div className="tw-container tw-mt-8 tw-flex">
        <h1 className="tw-text-4xl tw-font-medium tw-text-bookmark-red">
          My Purchases
        </h1>
      </div>
      {!loading && (
      <>
      {/* games */}
      
      <section id="purchases" className="tw-pb-6">
        <div className="tw-container tw-mt-16 tw-flex tw-gap-6 tw-flex-col">
          {purchases.map((purchase) => {
            return (
              <div className="tw-flex tw-flex-col tw-ml-6 tw-bg-bookmark-white tw-rounded-md tw-w-full tw-min-h-fit">
                <div className="tw-m-4">
                  <h1 className="title tw-text-3xl">Order from {purchase.date}</h1>
                  <h1 className="subtitle tw-text-xl tw-mb-2">Downloads: </h1>
                  <div className="tw-ml-6 tw-flex tw-flex-col tw-gap-2">
                    {purchase.content.map((game) => {
                      return (
                      <a href={game.download_url} className="hover:tw-underline tw-text-bookmark-red">Play {game.name}</a>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}

        </div>
        {purchases.length === 0 && (
          <h1 className="tw-text-center tw-text-4xl tw-font-medium">
            You have not made any purchases yet.
          </h1>
        )}
      </section>
      </>
      )}
    </>
  );
}
