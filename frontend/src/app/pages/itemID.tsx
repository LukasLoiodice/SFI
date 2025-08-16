import { useNavigate, useParams } from "react-router";
import { ItemVisualisation } from "src/features/items/components/item-visualisation";

function ItemID() {
    const { itemID } = useParams()
    const navigate = useNavigate()

    if (!itemID) {
        navigate('/')
        return
    }

    return (
        ItemVisualisation({ itemID: parseInt(itemID) })
    )
}

export default ItemID