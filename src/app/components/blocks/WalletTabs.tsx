import { FC, useMemo, useState } from "react";
import classNames from "clsx";
import { useAtomValue } from "jotai";
import Fuse from "fuse.js";

import { Account } from "core/types";

import { ACCOUNTS_SEARCH_OPTIONS } from "app/defaults";
import { allAccountsAtom } from "app/atoms";
import { TippySingletonProvider } from "app/hooks";
import ScrollAreaContainer from "app/components/elements/ScrollAreaContainer";
import Balance from "app/components/elements/Balance";
import HashPreview from "app/components/elements/HashPreview";
import AutoIcon from "app/components/elements/AutoIcon";
import SearchInput from "app/components/elements/SearchInput";
import IconedButton from "app/components/elements/IconedButton";
import WalletName from "app/components/elements/WalletName";
import { ReactComponent as ChevronRightIcon } from "app/icons/chevron-right.svg";
import { ReactComponent as AddWalletIcon } from "app/icons/add-wallet.svg";
import { ReactComponent as NoResultsFoundIcon } from "app/icons/no-results-found.svg";

type WalletTabsProps = {
  selectedAccount: Account;
  onAccountChange: (account: Account) => void;
  className?: string;
};

const WalletTabs: FC<WalletTabsProps> = ({
  selectedAccount,
  onAccountChange,
  className,
}) => {
  const accounts = useAtomValue(allAccountsAtom);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const fuse = useMemo(
    () => new Fuse(accounts, ACCOUNTS_SEARCH_OPTIONS),
    [accounts]
  );

  const filteredAccounts = useMemo(() => {
    if (searchValue) {
      return fuse.search(searchValue).map(({ item: account }) => account);
    }
    return accounts;
  }, [accounts, fuse, searchValue]);

  return (
    <div
      className={classNames(
        "w-[23.25rem] min-w-[23.25rem] pr-6",
        "border-r border-brand-main/[.07]",
        "flex flex-col",
        className
      )}
    >
      <div className="flex items-center">
        <TippySingletonProvider>
          <SearchInput
            searchValue={searchValue}
            toggleSearchValue={setSearchValue}
          />
          <IconedButton
            to={{ addAccOpened: true }}
            merge
            theme="tertiary"
            className="ml-2"
            Icon={AddWalletIcon}
            aria-label="Add new wallet"
          />
        </TippySingletonProvider>
      </div>
      {filteredAccounts.length > 0 ? (
        <ScrollAreaContainer
          hiddenScrollbar="horizontal"
          className="pr-5 -mr-5 mt-4"
          viewPortClassName="pb-20 rounded-t-[.625rem] viewportBlock"
          scrollBarClassName="py-0 pb-20"
        >
          {filteredAccounts.map((acc, i) => (
            <WalletTab
              key={acc.address}
              active={acc.address === selectedAccount.address}
              className={classNames(
                i !== filteredAccounts.length - 1 && "mb-2"
              )}
              account={acc}
              onClick={() => onAccountChange(acc)}
            />
          ))}
        </ScrollAreaContainer>
      ) : (
        <div
          className={classNames(
            "flex flex-col items-center",
            "h-full w-full py-9",
            "text-sm text-brand-placeholder text-center"
          )}
        >
          <NoResultsFoundIcon className="mb-4" />
          No results found
        </div>
      )}
    </div>
  );
};

export default WalletTabs;

type WalletTabProps = {
  account: Account;
  active?: boolean;
  className?: string;
  onClick: () => void;
};

const WalletTab: FC<WalletTabProps> = ({
  active,
  account,
  className,
  onClick,
}) => {
  const { address } = account;

  return (
    <button
      type="button"
      className={classNames(
        "relative group",
        "w-full",
        "p-3",
        "rounded-[.625rem]",
        "flex items-stretch",
        "text-left",
        "transition-colors",
        active && "bg-brand-main/10",
        !active && "hover:bg-brand-main/5",
        className
      )}
      onClick={onClick}
      autoFocus={active}
    >
      <AutoIcon
        seed={address}
        source="dicebear"
        type="personas"
        className={classNames(
          "h-14 w-14 min-w-[3.5rem]",
          "mr-3",
          "bg-black/20",
          "rounded-[.625rem]"
        )}
      />
      <span
        className={classNames(
          "flex flex-col",
          "text-base font-bold text-brand-light leading-[1.125rem]",
          "min-w-0",
          "transition-colors",
          "group-hover:text-brand-light",
          "group-focus-visible:text-brand-light"
        )}
      >
        <WalletName wallet={account} />
        <HashPreview
          hash={address}
          className="text-sm text-brand-inactivedark font-normal -mt-px"
          withTooltip={false}
        />
        <Balance address={address} className="mt-auto" />
      </span>
      <ChevronRightIcon
        className={classNames(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "transition",
          "group-hover:translate-x-0 group-hover:opacity-100",
          active && "translate-x-0 opacity-100",
          !active && "-translate-x-1.5 opacity-0"
        )}
      />
    </button>
  );
};
