const solicitarSoporte = async (req,res) => {
    const {laboratorio, n_maquina, descripcion} = req.body
    if (Object.values(req.body).includes("")){ return res.status(400).json({msg: "Complete todos los campos"})}
}