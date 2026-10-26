import { LucideSlash } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbProps = {
  breadcrumbs: {
    title: string;
    href?: string;
  }[];
};

function Breadcrumbs({ breadcrumbs }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <Fragment key={breadcrumb.href ?? breadcrumb.title}>
            <BreadcrumbItem>
              {breadcrumb.href ? (
                <BreadcrumbLink
                  render={
                    <Link
                      href={breadcrumb.href}
                      className="flex items-center gap-1"
                    >
                      {breadcrumb.title}
                    </Link>
                  }
                />
              ) : (
                <BreadcrumbPage>{breadcrumb.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <LucideSlash className="size-4" />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { Breadcrumbs };
