import { Container } from '@/components/shared/container';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#1B1B1B] mt-8" id="footer-el">
      <Container className="text-white px-4 pt-2 flex justify-between flex-col gap-2 max-[768px]:items-center">
        <div className="flex justify-between items-center">
          <div className="md:flex hidden">
            <Image
              src="/logoFooter.svg"
              alt="logo"
              width={0}
              height={0}
              className="xl:w-[134px] w-[98px] h-auto "
            ></Image>
          </div>
          <nav className="flex gap-8 max-[350px]:text-xs">
            <Link href="">О нас</Link>
            <Link href="">Доставка и оплата</Link>
            <Link href="">Контакты</Link>
          </nav>
          <address className="text-right md:block hidden">
            <p className="text-2xl">+7 (495) 617-14-24</p>
            <p>c 10:00 до 23:00</p>
          </address>
        </div>
        <div className="flex justify-end">
          <p className=" max-[350px]:text-xs">© Рикша. Все права защищены.</p>
        </div>
      </Container>
    </footer>
  );
}
