export default function TitleDesc({ desc = 'Add description' }: { desc?: string }) {
  return (
    <h4 className="font-['Outfit'] text-sm text-orange-400 relative before:w-[40px] before:h-[1px] before:absolute before:bg-orange-400 before:top-1/2 before:left-[-55px] mb-3 ml-14">
      {desc.toUpperCase()}
    </h4>
  );
}
