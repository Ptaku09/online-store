export default function TitleDesc({ desc = 'Add description' }: { desc?: string }) {
  return (
    <h4 className="font-['Outfit'] text-xs font-thin text-orange-200 relative before:w-[40px] before:h-[1px] before:absolute before:bg-orange-200 before:top-1/2 before:left-[-55px] mb-[25px] ml-14">
      {desc.toUpperCase()}
    </h4>
  );
}
