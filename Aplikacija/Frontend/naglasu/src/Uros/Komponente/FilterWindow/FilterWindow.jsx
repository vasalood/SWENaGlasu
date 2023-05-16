import Select from '@mui/material/Select'

export default function FilterWindow({ kategorije })
{
    const menuItemsKategorije = [
        {
            id: null,
            naziv: '--Izaberite Kategoriju--'
        }
    ].concat(kategorije.map(k =>
    {
        return <MenuItem value={k.id}>{k.ime}</MenuItem>
    }))

    const [selectedKat, setSelectedKat] = React.useState(null)
    const [podkategorijeForSelect, setPodkategorijeFS] = React.useState([])
    const [selectedPodkat, setPodkat] = React.useState(null)
    
    function handleSelectKat(ev)
    {
        const newKat = kategorije.filter(k => k.id == ev.target.value)[0]
        setSelectedKat(newKat)

    }
    return (
        <DropDown className='filterWindow'>
            <div className='filterWindow--kategorija_container'>
                <Select
                onChange={handleSelectKat}>
                    {menuItemsKategorije}
                </Select>
            </div>
        </DropDown>
    )
}