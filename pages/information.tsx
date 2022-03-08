import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Information() {
  const aboutRef = useRef<HTMLHeadingElement>(null);
  const deliveryRef = useRef<HTMLHeadingElement>(null);
  const returnsRef = useRef<HTMLHeadingElement>(null);
  const paymentsRef = useRef<HTMLHeadingElement>(null);
  const sizeRef = useRef<HTMLHeadingElement>(null);
  const aboutOn = useOnScreen(aboutRef);
  const deliveryOn = useOnScreen(deliveryRef);
  const returnsOn = useOnScreen(returnsRef);
  const paymentsOn = useOnScreen(paymentsRef);
  const sizeOn = useOnScreen(sizeRef);
  const [screenWidth, setScreenWidth] = useState(768);

  useEffect(() => {
    setScreenWidth(window.screen.width);
  }, []);

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

      <div className="w-screen max-h-screen md:grid md:grid-cols-[1fr_5fr] font-['Lato'] px-14 md:px-20 2xl:px-56 dark:bg-[rgba(55,55,55,1)]">
        {screenWidth >= 768 ? (
          <div className="max-h-screen w-full my-20">
            {[
              { title: 'About us', idCode: 'about', isOnScreen: aboutOn },
              { title: 'Delivery', idCode: 'delivery', isOnScreen: deliveryOn },
              { title: 'Returns and exchanges', idCode: 'returns', isOnScreen: returnsOn },
              { title: 'Payments', idCode: 'payments', isOnScreen: paymentsOn },
              { title: 'Size guide', idCode: 'size', isOnScreen: sizeOn },
            ].map(({ title, idCode, isOnScreen }: { title: string; idCode: string; isOnScreen: boolean }) => (
              <div className="py-5 text-xl border-b-[0.5px] border-b-gray-500 dark:border-b-white" key={title}>
                <a className={`${isOnScreen ? 'text-orange-400 font-bold' : 'dark:text-white'}`} href={`#${idCode}`}>
                  {title}
                </a>
              </div>
            ))}
          </div>
        ) : null}
        <div className="md:px-20 mt-20 max-h-screen flex flex-col items-start justify-start overflow-y-auto md:snap-y md:snap-mandatory scroll-smooth">
          <div className="relative xs:mb-20 md:mb-0 xs:mb-20 md:mb-0 snap-start min-h-screen h-full w-full">
            <h1 ref={aboutRef} className="relative text-5xl font-bold border-b-2 pb-3 mb-4">
              <span id="about" className="absolute -top-20" />
              About us
            </h1>
            <p className="md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae.
            </p>
            <span className="absolute xs:hidden bottom-28 2xl:bottom-56 w-full flex md:flex items-center justify-center gap-6">
              <a href="#delivery">
                <FontAwesomeIcon icon={faArrowDown} />
              </a>
            </span>
          </div>
          <div className="relative xs:mb-20 md:mb-0 snap-start min-h-screen h-full w-full">
            <h1 ref={deliveryRef} className="relative text-5xl font-bold border-b-2 pb-3 mb-4">
              <span id="delivery" className="absolute -top-20" />
              Delivery
            </h1>
            <p className="md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae.
            </p>
            <span className="absolute xs:hidden bottom-28 2xl:bottom-56 w-full flex md:flex items-center justify-center gap-6">
              <a href="#about">
                <FontAwesomeIcon icon={faArrowUp} />
              </a>
              <a href="#returns">
                <FontAwesomeIcon icon={faArrowDown} />
              </a>
            </span>
          </div>
          <div className="relative xs:mb-20 md:mb-0 snap-start min-h-screen h-full w-full">
            <h1 ref={returnsRef} className="relative text-5xl font-bold border-b-2 pb-3 mb-4">
              <span id="returns" className="absolute -top-20" />
              Returns
            </h1>
            <p className="md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae.
            </p>
            <span className="absolute xs:hidden bottom-28 2xl:bottom-56 w-full flex md:flex items-center justify-center gap-6">
              <a href="#delivery">
                <FontAwesomeIcon icon={faArrowUp} />
              </a>
              <a href="#payments">
                <FontAwesomeIcon icon={faArrowDown} />
              </a>
            </span>
          </div>
          <div className="relative xs:mb-20 md:mb-0 snap-start min-h-screen h-full w-full">
            <h1 ref={paymentsRef} className="relative text-5xl font-bold border-b-2 pb-3 mb-4">
              <span id="payments" className="absolute -top-20" />
              Payments
            </h1>
            <p className="md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae.
            </p>
            <span className="absolute xs:hidden bottom-28 2xl:bottom-56 w-full flex md:flex items-center justify-center gap-6">
              <a href="#returns">
                <FontAwesomeIcon icon={faArrowUp} />
              </a>
              <a href="#size">
                <FontAwesomeIcon icon={faArrowDown} />
              </a>
            </span>
          </div>
          <div className="relative xs:mb-20 md:mb-0 snap-start min-h-screen h-full w-full">
            <h1 ref={sizeRef} className="relative text-5xl font-bold border-b-2 pb-3 mb-4">
              <span id="size" className="absolute -top-20" />
              Size guide
            </h1>
            <p className="md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce imperdiet erat finibus metus mollis aliquam. In quis tristique elit,
              congue rhoncus diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc iaculis ligula id nisl
              varius, sed sollicitudin nibh pharetra. Fusce et malesuada ligula, vel interdum justo. Curabitur nec augue vel sem ullamcorper volutpat
              sit amet non ipsum. Proin ornare arcu sed ipsum varius, eget suscipit magna euismod. Integer maximus rhoncus tortor in convallis. Duis
              tortor urna, mattis sit amet tempor vel, ullamcorper a ligula. Donec accumsan metus nisl, eu ullamcorper nibh scelerisque non. Integer
              dictum mauris ipsum, et ultrices tortor tincidunt eu. Morbi sapien libero, sodales ut ornare et, luctus nec elit. Fusce orci felis,
              hendrerit a velit sit amet, aliquet scelerisque neque. In vulputate nunc urna, at malesuada dolor sagittis vitae.
            </p>
            <span className="absolute xs:hidden bottom-28 2xl:bottom-56 w-full flex md:flex items-center justify-center gap-6">
              <a href="#payments">
                <FontAwesomeIcon icon={faArrowUp} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
