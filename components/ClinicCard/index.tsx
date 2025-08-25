import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ClinicCard.module.css";

export interface ClinicCardProps {
	title?: string;
	logoSrc?: string;
	href?: string;
	className?: string;
	onClick?: () => void;
	logoAlt?: string;
	logoSize?: number; // square px
	logoBg?: string; // background color for logo container
}

const CardContent: React.FC<{
	title?: string;
	logoSrc?: string;
	logoAlt?: string;
	logoSize?: number;
	logoBg?: string;
}> = ({ title, logoSrc, logoAlt, logoSize = 44, logoBg }) => {
	const effectiveTitle = title || "Clinic";
	const effectiveSrc = logoSrc || "/next.svg";
	return (
		<>
			<div className={styles.logoWrap} style={logoBg ? { background: logoBg } : undefined}>
				<Image
					src={effectiveSrc}
					alt={logoAlt || effectiveTitle}
					width={logoSize}
					height={logoSize}
					className={styles.logo}
				/>
			</div>
			<p className={styles.title}>{effectiveTitle}</p>
		</>
	);
};

const ClinicCard: React.FC<ClinicCardProps> = ({
	title,
	logoSrc,
	href,
	className,
	onClick,
	logoAlt,
	logoSize,
	logoBg,
}) => {
	const classNames = [styles.card, href || onClick ? styles.clickable : "", className]
		.filter(Boolean)
		.join(" ");

	const label = title || "Clinic";

	if (href) {
		return (
			<Link href={href} className={classNames} aria-label={label}>
				<CardContent title={title} logoSrc={logoSrc} logoAlt={logoAlt} logoSize={logoSize} logoBg={logoBg} />
			</Link>
		);
	}

	if (onClick) {
		return (
			<button type="button" onClick={onClick} className={classNames} aria-label={label}>
				<CardContent title={title} logoSrc={logoSrc} logoAlt={logoAlt} logoSize={logoSize} logoBg={logoBg} />
			</button>
		);
	}

	return (
		<div className={classNames} role="group" aria-label={label}>
			<CardContent title={title} logoSrc={logoSrc} logoAlt={logoAlt} logoSize={logoSize} logoBg={logoBg} />
		</div>
	);
};

export default ClinicCard;
export type { ClinicCardProps as TClinicCardProps };
