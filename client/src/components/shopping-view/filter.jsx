import { filterOptions } from "@/config";
import { Fragment, useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { gsap } from "gsap";

function ProductFilter({ filters, handleFilter }) {
  const filterRef = useRef(null);

  // Animation effect on component mount
  useEffect(() => {
    if (filterRef.current) {
      gsap.from(filterRef.current, {
        x: -50, // Start from the left
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div ref={filterRef} className="bg-background rounded-lg border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold text-primary">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold text-secondary capitalize">
                {keyItem}
              </h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex font-medium text-primary items-center gap-2"
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
