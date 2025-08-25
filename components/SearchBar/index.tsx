// SearchBar.tsx
import React from 'react'
import { IoIosSearch } from "react-icons/io";
import styles from "./SearchBar.module.css"

interface InputProps {
    label: string
    width?: string
    height?: string
    onChange?: (value: string) => void
    onSearch?: (value: string) => void
    value?: string
    disabled?: boolean
}

const Input = (props: InputProps) => {
    const { label, width, height, onChange, onSearch, value, disabled } = props

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch((e.target as HTMLInputElement).value)
        }
    }

    const handleIconClick = () => {
        if (onSearch && value) {
            onSearch(value)
        }
    }

    return (
        <div 
            className={styles['input-container']}
            style={{ width: width }}
        >
            <IoIosSearch 
                className={styles['search-icon']}
                onClick={handleIconClick}
            />
            <input 
                type="text" 
                placeholder={label || "Search"}
                style={{ height: height }}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                value={value}
                disabled={disabled}
            />
        </div>
    )
}

export default Input