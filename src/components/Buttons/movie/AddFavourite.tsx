import React from 'react'
import { ActionButton } from './ActionButton'
import { EyeIcon, Heart } from 'lucide-react'

const AddFavouriteButton = () => {
    return (
        <ActionButton
            size="xs"
            variant="outline"
            className="text-yellow-400 hover:bg-yellow-500 cursor-pointer"
            icon={<Heart />}
            tooltip="click to add to your favourite movie"
        >
            Add Favourite
        </ActionButton>
    )
}

export default AddFavouriteButton