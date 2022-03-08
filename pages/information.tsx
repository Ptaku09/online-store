import Head from 'next/head';
import React from 'react';

export default function Information() {
  return (
    <>
      <Head>
        <title>Information ℹ️</title>
        <meta
          name="viewport"
          content="height=device-height,
                      width=device-width, initial-scale=1.0,
                      minimum-scale=1.0, maximum-scale=1.0"
        />
      </Head>

      <div className="w-screen max-h-screen lg:grid lg:grid-cols-[1fr_5fr] font-['Lato'] px-14 lg:px-20 text-2xl dark:bg-[rgba(55,55,55,1)]">
        <div className="max-h-screen w-full my-20">
          {[
            { title: 'About us', href: '#about' },
            { title: 'Delivery', href: '#delivery' },
            { title: 'Returns and exchanges', href: '#returns' },
            { title: 'Payments', href: '#payments' },
            { title: 'Size guide', href: '#size' },
          ].map(({ title, href }: { title: string; href: string }) => (
            <div className="py-5 text-xl border-b-[0.5px] border-b-white" key={title}>
              <a href={href}>{title}</a>
            </div>
          ))}
        </div>
        <div className="px-20 mt-20 max-h-screen flex flex-col items-start justify-start overflow-y-auto snap-y snap-mandatory scroll-smooth">
          <div className="snap-start min-h-screen h-full">
            <h1 className="relative text-4xl">
              <span id="about" className="absolute -top-20" />
              About us
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae. Mauris id nulla id
              augue rutrum convallis ut in massa. Pellentesque convallis, tortor imperdiet varius suscipit, enim ligula ultrices ligula, ac cursus
              urna lacus sed diam.
            </p>
          </div>
          <div className="snap-start min-h-screen h-full">
            <h1 className="relative text-4xl">
              <span id="delivery" className="absolute -top-20" />
              Delivery
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae. Mauris id nulla id
              augue rutrum convallis ut in massa. Pellentesque convallis, tortor imperdiet varius suscipit, enim ligula ultrices ligula, ac cursus
              urna lacus sed diam.
            </p>
          </div>
          <div className="snap-start min-h-screen h-full">
            <h1 className="relative text-4xl">
              <span id="returns" className="absolute -top-20" />
              Returns
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae. Mauris id nulla id
              augue rutrum convallis ut in massa. Pellentesque convallis, tortor imperdiet varius suscipit, enim ligula ultrices ligula, ac cursus
              urna lacus sed diam.
            </p>
          </div>
          <div className="snap-start min-h-screen h-full">
            <h1 className="relative text-4xl">
              <span id="payments" className="absolute -top-20" />
              Payments
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae. Mauris id nulla id
              augue rutrum convallis ut in massa. Pellentesque convallis, tortor imperdiet varius suscipit, enim ligula ultrices ligula, ac cursus
              urna lacus sed diam.
            </p>
          </div>
          <div className="snap-start min-h-screen h-full">
            <h1 className="relative text-4xl">
              <span id="size" className="absolute -top-20" />
              Size guide
            </h1>
            <p className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae. Mauris id nulla id
              augue rutrum convallis ut in massa. Pellentesque convallis, tortor imperdiet varius suscipit, enim ligula ultrices ligula, ac cursus
              urna lacus sed diam.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
